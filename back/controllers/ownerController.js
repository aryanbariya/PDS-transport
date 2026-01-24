const { v4: uuidv4 } = require("uuid");
const Owner = require("../models/ownerModel");
const updateTableStats = require("../utils/updateTableStats");

// **Get All Owners**
exports.getAllOwners = async (req, res) => {
  try {
    const owners = await Owner.getAll();
    res.json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get Single Owner by UUID**
exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owner.getById(req.params.uuid);
    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }
    res.json(owner);
  } catch (error) {
    console.error("Error fetching owner:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New Owner**
exports.addOwner = async (req, res) => {
  try {
    const { ownerName, contact, address, emailID } = req.body;

    if (!ownerName) {
      return res.status(400).json({ error: "Owner Name is required" });
    }

    const uuid = uuidv4();
    const owner_id = await Owner.getNextOwnerId();

    await Owner.add({ uuid, ownerName, contact, address, emailID, owner_id });
    updateTableStats('owners');

    res.status(201).json({ message: "Owner added successfully", uuid, owner_id });
  } catch (error) {
    console.error("Error adding owner:", error);
    res.status(500).json({ error: "Database insertion failed" });
  }
};

// **Update Owner**
exports.updateOwner = async (req, res) => {
  try {
    const { ownerName, contact, address, emailID } = req.body;

    if (!ownerName) {
      return res.status(400).json({ error: "Owner name is required" });
    }

    let fields = ["ownerName = ?"];
    let values = [ownerName];

    if (contact !== undefined) {
      fields.push("contact = ?");
      values.push(contact);
    }
    if (address !== undefined) {
      fields.push("address = ?");
      values.push(address);
    }
    if (emailID !== undefined) {
      fields.push("emailID = ?");
      values.push(emailID);
    }

    const updates = { fields, values };

    const result = await Owner.update(req.params.uuid, updates);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }
    updateTableStats('owners');
    res.json({ message: "Owner updated successfully" });
  } catch (error) {
    console.error("Error updating owner:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Delete Owner and Reset Owner IDs**
exports.deleteOwner = async (req, res) => {
  try {
    const result = await Owner.delete(req.params.uuid);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Owner not found" });
    }

    updateTableStats('owners');
    await Owner.resetOwnerIds();
    res.json({ message: "Owner deleted and owner_id reset successfully!" });
  } catch (error) {
    console.error("Error deleting owner:", error);
    res.status(500).json({ error: "Database deletion failed" });
  }
};