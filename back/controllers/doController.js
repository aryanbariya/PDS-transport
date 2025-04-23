const DO = require("../models/doModel");

// **Get All DO Records**
exports.getAllDOs = async (req, res) => {
  try {
    const dos = await DO.getAll();
    res.json(dos);
  } catch (error) {
    console.error("Error fetching DO records:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Get DO Record by DO Number**
exports.getDOByNumber = async (req, res) => {
  try {
    const doNo = req.params.doNo;
    const doData = await DO.getByNumber(doNo);

    if (!doData) {
      return res.status(404).json({ error: "DO not found" });
    }

    const entryRow = await DO.getEntriesByDOId(doNo);

    let entries = [];
    if (entryRow) {
      const godowns = entryRow.godown.split("|");
      const vahtuks = entryRow.vahtuk.split("|");
      const quantities = entryRow.quantity.split("|");

      entries = godowns.map((g, i) => ({
        godown: g,
        vahtuk: vahtuks[i],
        quantity: quantities[i],
      }));
    }

    res.json({ ...doData, entries });
  } catch (error) {
    console.error("Error fetching DO by number:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};

// **Add New DO Record**
exports.addDO = async (req, res) => {
  try {
    const { doNo, baseDepot, doDate, doExpiryDate, scheme, grain, quantity, quintal, total_amount, expire_date, entries } = req.body;

    const doData = [doNo, baseDepot, doDate, doExpiryDate, scheme, grain, quantity, quintal, total_amount, expire_date];
    await DO.addDO(doData);

    if (!entries || !Array.isArray(entries) || entries.length === 0) {
      return res.json({ message: "✅ DO inserted (no entries)", do_id: doNo });
    }

    const godownStr = entries.map((e) => e.godown.trim()).join("|");
    const vahtukStr = entries.map((e) => e.vahtuk.trim()).join("|");
    const quantityStr = entries.map((e) => e.quantity).join("|");

    await DO.addEntries(doNo, godownStr, vahtukStr, quantityStr);

    res.json({ message: "✅ DO and pipe-joined entries inserted successfully", do_id: doNo });
  } catch (error) {
    console.error("Error adding DO:", error);
    res.status(500).json({ error: "Database insertion error" });
  }
};

// **Update DO Record**
exports.updateDO = async (req, res) => {
  try {
    const { stock_id } = req.params;
    const { doNo, baseDepot, doDate, doExpiryDate, scheme, grain, quantity, entries } = req.body;

    const doData = [doNo, baseDepot, doDate, doExpiryDate, scheme, grain, quantity];
    const result = await DO.updateDO(stock_id, doData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "DO not found" });
    }

    const godownStr = entries.map((e) => e.godown.trim()).join("|");
    const vahtukStr = entries.map((e) => e.vahtuk.trim()).join("|");
    const quantityStr = entries.map((e) => e.quantity).join("|");

    await DO.updateEntries(doNo, godownStr, vahtukStr, quantityStr);

    res.json({ message: "✅ DO and DO entries updated successfully" });
  } catch (error) {
    console.error("Error updating DO:", error);
    res.status(500).json({ error: "Database update error" });
  }
};

// **Get All MSWC Godowns**
exports.getAllMSWCGodowns = async (req, res) => {
  try {
    const godowns = await DO.getAllMSWCGodowns();
    res.json(godowns);
  } catch (error) {
    console.error("Error fetching MSWC godowns:", error);
    res.status(500).json({ error: "Database fetch error" });
  }
};