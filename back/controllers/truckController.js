const { v4: uuidv4 } = require("uuid");
const Truck = require("../models/truckModel");

// **Get All Trucks Ordered by Truck ID**
exports.getAllTrucksByOwner = async (req, res) => {
  try {
    const trucks = await Truck.getAllTrucksByOwner();
    res.json(trucks);
  } catch (error) {
    console.error("Error fetching trucks:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};
// **Get All Trucks**
exports.getAllTrucks = async (req, res) => {
  try {
    const trucks = await Truck.getAll();
    res.json(trucks);
  } catch (error) {
    console.error("Error fetching trucks:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Active Trucks**
exports.getActiveTrucks = async (req, res) => {
  try {
    const trucks = await Truck.getActive();
    res.json(trucks);
  } catch (error) {
    console.error("Error fetching active trucks:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Inactive Trucks**
exports.getInactiveTrucks = async (req, res) => {
  try {
    const trucks = await Truck.getInactive();
    res.json(trucks);
  } catch (error) {
    console.error("Error fetching inactive trucks:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Truck by UUID**
exports.getTruckById = async (req, res) => {
  try {
    const truck = await Truck.getById(req.params.uuid);
    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.json(truck);
  } catch (error) {
    console.error("Error fetching truck:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Truck**
exports.addTruck = async (req, res) => {
  try {
    const { truck_name, truck_status = "Active", empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;

    if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const uuid = uuidv4();
    const truck_id = await Truck.getNextTruckId();

    await Truck.add([
      uuid, truck_name, truck_status, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id,
      tax_validity_date || null, insurance_validity_date || null, fitness_validity_date || null,
      permit_validity_date || null, direct_sale, truck_id
    ]);

    res.status(201).json({ message: "Truck added successfully", uuid, truck_id });
  } catch (error) {
    console.error("Error adding truck:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Truck**
exports.updateTruck = async (req, res) => {
  try {
    const { truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id, truck_status = "Active", tax_validity_date, insurance_validity_date, fitness_validity_date, permit_validity_date, direct_sale } = req.body;

    if (!truck_name || !empty_weight || !company || !gvw || !reg_date || !truck_owner_name || !owner_id) {
      return res.status(400).json({ error: "Required fields: truck_name, empty_weight, company, gvw, reg_date, truck_owner_name, owner_id" });
    }

    const updates = { fields: [], values: [] };

    if (truck_name) updates.fields.push("truck_name = ?"), updates.values.push(truck_name);
    if (empty_weight) updates.fields.push("empty_weight = ?"), updates.values.push(empty_weight);
    if (company) updates.fields.push("company = ?"), updates.values.push(company);
    if (gvw) updates.fields.push("gvw = ?"), updates.values.push(gvw);
    if (reg_date) updates.fields.push("reg_date = ?"), updates.values.push(reg_date);
    if (truck_owner_name) updates.fields.push("truck_owner_name = ?"), updates.values.push(truck_owner_name);
    if (owner_id) updates.fields.push("owner_id = ?"), updates.values.push(owner_id);
    if (truck_status) updates.fields.push("truck_status = ?"), updates.values.push(truck_status);
    if (tax_validity_date) updates.fields.push("tax_validity = ?"), updates.values.push(tax_validity_date);
    if (insurance_validity_date) updates.fields.push("insurance_validity = ?"), updates.values.push(insurance_validity_date);
    if (fitness_validity_date) updates.fields.push("fitness_validity = ?"), updates.values.push(fitness_validity_date);
    if (permit_validity_date) updates.fields.push("permit_validity = ?"), updates.values.push(permit_validity_date);
    if (direct_sale !== undefined) updates.fields.push("direct_sale = ?"), updates.values.push(direct_sale);

    if (updates.fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const result = await Truck.update(req.params.uuid, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.json({ message: "Truck updated successfully" });
  } catch (error) {
    console.error("Error updating truck:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Soft Delete Truck**
exports.deleteTruck = async (req, res) => {
  try {
    const result = await Truck.softDelete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.json({ message: "Truck status updated to Inactive successfully!" });
  } catch (error) {
    console.error("Error deleting truck:", error);
    res.status(500).json({ error: "Failed to update truck status" });
  }
};