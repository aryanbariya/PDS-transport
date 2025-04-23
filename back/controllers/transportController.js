const { v4: uuidv4 } = require("uuid");
const Transport = require("../models/transportModel");

// **Get All Active Transport Records**
exports.getActiveTransports = async (req, res) => {
  try {
    const transports = await Transport.getActive();
    res.json(transports);
  } catch (error) {
    console.error("Error fetching active transport:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get All Inactive Transport Records**
exports.getInactiveTransports = async (req, res) => {
  try {
    const transports = await Transport.getInactive();
    res.json(transports);
  } catch (error) {
    console.error("Error fetching inactive transport:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get All Transport Records**
exports.getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.getAll();
    res.json(transports);
  } catch (error) {
    console.error("Error fetching transport records:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Transport Record by UUID**
exports.getTransportById = async (req, res) => {
  try {
    const transport = await Transport.getById(req.params.uuid);
    if (!transport) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json(transport);
  } catch (error) {
    console.error("Error fetching transport record:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Transport Record**
exports.addTransport = async (req, res) => {
  try {
    const uuid = uuidv4();
    const {
      baseDepo, doNo, godown, truck, owner, driver, emptyWeight, grossWeight,
      scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, netWeight,
      dispatchDate, quota, tpNo, allocation, status = "Active"
    } = req.body;

    if (!baseDepo || !doNo || !godown || !truck || !owner || !driver || !emptyWeight || !grossWeight ||
        !scheme || !packaging || !noOfBags || !bardanWeight || !loadedNetWeight || !netWeight ||
        !dispatchDate || !quota || !tpNo || !allocation) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const trans_id = await Transport.getNextTransId();
    await Transport.add([
      uuid, trans_id, baseDepo, doNo, godown, truck, owner, driver, emptyWeight,
      grossWeight, scheme, packaging, noOfBags, bardanWeight, loadedNetWeight,
      netWeight, dispatchDate, quota, tpNo, allocation, status
    ]);

    res.status(201).json({ message: "Transport record added successfully", uuid, trans_id });
  } catch (error) {
    console.error("Error adding transport record:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Transport Record**
exports.updateTransport = async (req, res) => {
  try {
    const updates = { fields: [], values: [] };
    const {
      baseDepo, doNo, godown, truck, owner, driver, emptyWeight, grossWeight,
      scheme, packaging, noOfBags, bardanWeight, loadedNetWeight, netWeight,
      dispatchDate, quota, tpNo, allocation, status
    } = req.body;

    if (baseDepo) updates.fields.push("baseDepo = ?"), updates.values.push(baseDepo);
    if (doNo) updates.fields.push("doNo = ?"), updates.values.push(doNo);
    if (godown) updates.fields.push("godown = ?"), updates.values.push(godown);
    if (truck) updates.fields.push("truck = ?"), updates.values.push(truck);
    if (owner) updates.fields.push("owner = ?"), updates.values.push(owner);
    if (driver) updates.fields.push("driver = ?"), updates.values.push(driver);
    if (emptyWeight) updates.fields.push("emptyWeight = ?"), updates.values.push(emptyWeight);
    if (grossWeight) updates.fields.push("grossWeight = ?"), updates.values.push(grossWeight);
    if (scheme) updates.fields.push("scheme = ?"), updates.values.push(scheme);
    if (packaging) updates.fields.push("packaging = ?"), updates.values.push(packaging);
    if (noOfBags) updates.fields.push("noOfBags = ?"), updates.values.push(noOfBags);
    if (bardanWeight) updates.fields.push("bardanWeight = ?"), updates.values.push(bardanWeight);
    if (loadedNetWeight) updates.fields.push("loadedNetWeight = ?"), updates.values.push(loadedNetWeight);
    if (netWeight) updates.fields.push("netWeight = ?"), updates.values.push(netWeight);
    if (dispatchDate) updates.fields.push("dispatchDate = ?"), updates.values.push(dispatchDate);
    if (quota) updates.fields.push("quota = ?"), updates.values.push(quota);
    if (tpNo) updates.fields.push("tpNo = ?"), updates.values.push(tpNo);
    if (allocation) updates.fields.push("allocation = ?"), updates.values.push(allocation);
    if (status) updates.fields.push("status = ?"), updates.values.push(status);

    if (updates.fields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    const result = await Transport.update(req.params.uuid, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }
    res.json({ message: "Transport record updated successfully" });
  } catch (error) {
    console.error("Error updating transport record:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Soft Delete Transport Record**
exports.deleteTransport = async (req, res) => {
  try {
    const result = await Transport.softDelete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transport not found" });
    }
    res.json({ message: "Transport status updated to Inactive successfully!" });
  } catch (error) {
    console.error("Error deleting transport record:", error);
    res.status(500).json({ error: "Failed to update transport status" });
  }
};