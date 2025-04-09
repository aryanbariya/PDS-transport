import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const URL = import.meta.env.VITE_API_BACK_URL;

const TransportForm = ({ onClose, onSave, editData }) => {
  const [formData, setFormData] = useState({
    baseDepo: "",
    doNo: "",
    godown: "",
    truck: "",
    owner: "",
    driver: "",
    emptyWeight: "",
    grossWeight: "",
    scheme: "",
    packaging: "",
    noOfBags: "",
    bardanWeight: "",
    loadedNetWeight: "",
    netWeight: "",
    dispatchDate: "",
    quota: "",
    tpNo: "",
    allocation: "",
  });

  const [errors, setErrors] = useState({});
  const [baseDepoList, setBaseDepoList] = useState([]);
  const [doNoList, setDoNoList] = useState([]);
  const [godownList, setGodownList] = useState([]);
  const [truckList, setTruckList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [driverList, setDriverList] = useState([]);
  const [scheme, setscheme] = useState([]);
  const [packaging, setpackaging] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (editData) {
      setFormData({
        baseDepo: editData.baseDepo || "",
        doNo: editData.doNo || "",
        godown: editData.godown || "",
        truck: editData.truck || "",
        owner: editData.owner || "",
        driver: editData.driver || "",
        emptyWeight: editData.emptyWeight || "",
        grossWeight: editData.grossWeight || "",
        scheme: editData.scheme || "",
        packaging: editData.packaging || "",
        noOfBags: editData.noOfBags || "",
        bardanWeight: editData.bardanWeight || "",
        loadedNetWeight: editData.loadedNetWeight || "",
        netWeight: editData.netWeight || "",
        dispatchDate: editData.dispatchDate ? new Date(editData.dispatchDate).toISOString().split('T')[0] : "",
        quota: editData.quota ? new Date(editData.quota).toISOString().split('T')[0] : "",
        tpNo: editData.tpNo || "",
        allocation: editData.allocation || ""
      });
      
    }
  }, [editData]);

  const fetchDropdownData = async () => {
    setIsLoading(true);
    try {
      const [
        baseDepoRes,
        doNoRes,
        godownsRes,
        trucksRes,
        ownersRes,
        driversRes,
        schemeRes,
        packagingRes
      ] = await Promise.all([
        fetch(`${URL}/api/mswcgodown`),
        fetch(`${URL}/api/do`),
        fetch(`${URL}/api/subgodown`),
        fetch(`${URL}/api/truck`),
        fetch(`${URL}/api/owners`),
        fetch(`${URL}/api/drivers`),
        fetch(`${URL}/api/scheme`),
        fetch(`${URL}/api/packaging`)
      ]);

      if (!baseDepoRes.ok) throw new Error("Failed to fetch base depo data");
      if (!doNoRes.ok) throw new Error("Failed to fetch DO numbers");
      if (!godownsRes.ok) throw new Error("Failed to fetch godowns");
      if (!trucksRes.ok) throw new Error("Failed to fetch trucks");
      if (!ownersRes.ok) throw new Error("Failed to fetch owners");
      if (!driversRes.ok) throw new Error("Failed to fetch drivers");
      if (!schemeRes.ok) throw new Error("Failed to fetch schemes");
      if (!packagingRes.ok) throw new Error("Failed to fetch packaging");

      const baseDepos = await baseDepoRes.json();
      const doNumbers = await doNoRes.json();
      const godowns = await godownsRes.json();
      const trucks = await trucksRes.json();
      const owners = await ownersRes.json();
      const drivers = await driversRes.json();
      const schemes = await schemeRes.json();
      const packagingData = await packagingRes.json();

      setBaseDepoList(baseDepos);
      setDoNoList(doNumbers);
      setGodownList(godowns);
      setTruckList(trucks);
      setOwnerList(owners);
      setDriverList(drivers);
      setscheme(schemes);
      setpackaging(packagingData);
    } catch (error) {
      console.error("Error fetching dropdown data:", error);
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Failed to fetch dropdown data: " + error.message 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => {
      let updatedData = { ...prevState, [name]: value };

      // Truck logic: Auto-fill emptyWeight
      if (name === "truck") {
        const selectedTruck = truckList.find(truck => truck.truck_name === value);
        updatedData.emptyWeight = selectedTruck ? selectedTruck.empty_weight : "0";
      }

      // Packaging logic: Set noOfBags only if it's empty
      if (name === "packaging") {
        const selectedPackaging = packaging.find(pkg => pkg.material_name === value);
        if (selectedPackaging) {
          updatedData.noOfBags = prevState.noOfBags || "1"; // Keep existing value unless empty
          updatedData.bardanWeight = selectedPackaging.weight;
        } else {
          updatedData.noOfBags = "";
          updatedData.bardanWeight = "0";
        }
      }

      // No of Bags logic: Update bardanWeight dynamically
      if (name === "noOfBags") {
        const bagsCount = parseInt(value, 10) || 0;
        const packagingData = packaging.find(pkg => pkg.material_name === prevState.packaging);
        if (packagingData) {
          updatedData.bardanWeight = bagsCount > 0 ? (bagsCount * packagingData.weight).toFixed(2) : "0";
        } else {
          updatedData.bardanWeight = "0";
        }
      }

      // Calculate Loaded Net Weight
      const grossWeight = parseFloat(updatedData.grossWeight || prevState.grossWeight || 0);
      const emptyWeight = parseFloat(updatedData.emptyWeight || prevState.emptyWeight || 0);
      const bardanWeight = parseFloat(updatedData.bardanWeight || prevState.bardanWeight || 0);
      updatedData.loadedNetWeight = (grossWeight - emptyWeight - bardanWeight).toFixed(2);

      // Calculate Net Weight
      updatedData.netWeight = (parseFloat(updatedData.loadedNetWeight) - bardanWeight).toFixed(2);

      return updatedData;
    });

    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.baseDepo) newErrors.baseDepo = "Base Depo is required";
    if (!formData.doNo) newErrors.doNo = "DO Number is required";
    // Add more validation as needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(editData ? `${URL}/api/transport/${editData.uuid}` :`${URL}/api/transport`, {
        method: editData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: editData ? "Transport updated successfully!" : "Transport added successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          onSave();
          onClose();
        });
      } else {
        Swal.fire({ 
          icon: "error", 
          title: "Error", 
          text: "Failed to submit form" 
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: "Error submitting data" 
      });
    }
  };

  const renderInputField = (field, label, type = "text") => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {(field === "baseDepo" || field === "doNo") && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          type={type}
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className={`p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder={`Enter ${label}`}
        />
        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
      </div>
    );
  };

  const renderSelectField = (field, label, options, valueKey, displayKey) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {(field === "baseDepo" || field === "doNo") && <span className="text-red-500 ml-1">*</span>}
        </label>
        <select
          name={field}
          value={formData[field]}
          onChange={handleChange}
          className={`p-2 border ${errors[field] ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          <option value="">Select {label}</option>
          {options.map((option) => {
            let value, display;
            switch (field) {
              case "baseDepo":
                value = option.godownName;
                display = option.godownName;
                break;
              case "doNo":
                value = option.do_no;
                display = option.do_no;
                break;
              case "godown":
                value = option.subGodown;
                display = option.subGodown;
                break;
              case "truck":
                value = option.truck_name;
                display = option.truck_name;
                break;
              case "owner":
                value = option.ownerName;
                display = option.ownerName;
                break;
              case "driver":
                value = option.driver_name;
                display = option.driver_name;
                break;
              case "scheme":
                value = option.scheme_name;
                display = option.scheme_name;
                break;
              case "packaging":
                value = option.material_name;
                display = option.material_name;
                break;
              default:
                value = option[valueKey];
                display = option[displayKey];
            }
            return (
              <option key={option.uuid || option.id} value={value}>
                {display}
              </option>
            );
          })}
        </select>
        {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
      </div>
    );
  };

  // Special case for number of bags selection
  const renderBagsSelector = () => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bags</label>
        <select
          name="noOfBags"
          value={formData.noOfBags}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select</option>
          {[...Array(100)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
            <span>Loading form data...</span>
          </div>
        </div>
      </div>
    );
  }




  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-5xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">{editData ? " Transport Details" : "Add TP"}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
            {/* Section: Basic Info */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Basic Information</h3>
              {renderSelectField("baseDepo", "Base Depo", baseDepoList, "godownName", "godownName")}
              {renderSelectField("doNo", "DO Number", doNoList, "id", "Name")}
              {renderSelectField("godown", "Godown", godownList, "id", "subGodown")}
              {renderInputField("dispatchDate", "Dispatch Date", "date")}
              {renderInputField("quota", "Quota Date", "date")}
              {renderSelectField("scheme", "Scheme", scheme, "id", "scheme_name")}
              {renderInputField("allocation", "Allocation")}
            </div>

            {/* Section: Vehicle Info */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Vehicle Information</h3>
              {renderSelectField("truck", "Truck", truckList, "uuid", "truck_name")}
              {renderSelectField("owner", "Owner", ownerList, "id", "ownerName")}
              {renderSelectField("driver", "Driver", driverList, "id", "driver_name")}
              {renderInputField("emptyWeight", "Empty Weight (kg)")}
              {renderInputField("grossWeight", "Gross Weight (kg)")}
              {renderInputField("tpNo", "TP Number")}
            </div>

            {/* Section: Cargo Info */}
            <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-700 mb-3 border-b pb-2">Cargo Information</h3>
              {renderSelectField("packaging", "Packaging", packaging, "id", "material_name")}
              {renderBagsSelector()}
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm text-blue-700 mb-2">Weight Calculations</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Bardan Weight:</span>
                      <span className="text-sm font-medium">{formData.bardanWeight || "0"} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Loaded Net Weight:</span>
                      <span className="text-sm font-medium">{formData.loadedNetWeight || "0"} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Net Weight:</span>
                      <span className="text-sm font-medium">{formData.netWeight || "0"} kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editData ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransportForm;