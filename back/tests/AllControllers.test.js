// // tests/doController.test.js
// const doController = require('../controllers/doController');
// const DO = require('../models/doModel');

// jest.mock('../models/doModel'); // 👈 Important: Mock the model

// // Mock response & request
// const mockResponse = () => {
//   const res = {};
//   res.status = jest.fn().mockReturnValue(res); // to allow chaining
//   res.json = jest.fn();
//   return res;
// };

// describe('DO Controller', () => {

//   afterEach(() => {
//     jest.clearAllMocks(); // clean between tests
//   });

//   test('getAllDOs - should return all DO records', async () => {
//     const mockDOs = [{ doNo: 'D001' }, { doNo: 'D002' }];
//     DO.getAll.mockResolvedValue(mockDOs);

//     const req = {};
//     const res = mockResponse();

//     await doController.getAllDOs(req, res);

//     expect(DO.getAll).toHaveBeenCalled();
//     expect(res.json).toHaveBeenCalledWith(mockDOs);
//   });

//   test('getDOByNumber - should return a DO with entries', async () => {
//     const req = { params: { doNo: 'D001' } };
//     const res = mockResponse();

//     DO.getByNumber.mockResolvedValue({
//       doNo: 'D001',
//       scheme: 'TPDS',
//     });

//     DO.getEntriesByDOId.mockResolvedValue({
//       godown: 'A|B',
//       vahtuk: 'X|Y',
//       quantity: '10|20',
//     });

//     await doController.getDOByNumber(req, res);

//     expect(DO.getByNumber).toHaveBeenCalledWith('D001');
//     expect(DO.getEntriesByDOId).toHaveBeenCalledWith('D001');
//     expect(res.json).toHaveBeenCalledWith({
//       doNo: 'D001',
//       scheme: 'TPDS',
//       entries: [
//         { godown: 'A', vahtuk: 'X', quantity: '10' },
//         { godown: 'B', vahtuk: 'Y', quantity: '20' },
//       ],
//     });
//   });

//   test('addDO - should insert DO and entries', async () => {
//     const req = {
//       body: {
//         doNo: 'D003',
//         baseDepot: 'Depot A',
//         doDate: '2024-04-01',
//         doExpiryDate: '2024-05-01',
//         scheme: 'TPDS',
//         grain: 'Wheat',
//         quantity: '100',
//         quintal: '10',
//         total_amount: 1000,
//         expire_date: '2024-05-01',
//         entries: [
//           { godown: 'G1', vahtuk: 'V1', quantity: '50' },
//           { godown: 'G2', vahtuk: 'V2', quantity: '50' },
//         ],
//       },
//     };

//     const res = mockResponse();

//     DO.addDO.mockResolvedValue();
//     DO.addEntries.mockResolvedValue();

//     await doController.addDO(req, res);

//     expect(DO.addDO).toHaveBeenCalled();
//     expect(DO.addEntries).toHaveBeenCalled();
//     expect(res.json).toHaveBeenCalledWith({
//       message: "✅ DO and pipe-joined entries inserted successfully",
//       do_id: 'D003',
//     });
//   });

// });


const request = require("supertest");
const app = require("../server"); // Assuming your Express app is exported from server.js

describe("Integration Testing for Routes", () => {
  // Test Auth Routes
  describe("Auth Routes", () => {
    it("should sign up a new user", async () => {
      const response = await request(app).post("/auth/signup").send({
        username: "testuser",
        password: "testpassword",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message");
    });

    it("should sign in an existing user", async () => {
      const response = await request(app).post("/auth/signin").send({
        username: "testuser",
        password: "testpassword",
      });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });
  });

  // Test DO Routes
  describe("DO Routes", () => {
    it("should fetch all DO records", async () => {
      const response = await request(app).get("/api/do");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should fetch a DO by number", async () => {
      const doNo = "D001"; // Replace with a valid DO number
      const response = await request(app).get(`/api/do/${doNo}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("doNo", doNo);
    });
  });

  // Test Driver Routes
  describe("Driver Routes", () => {
    it("should fetch all drivers", async () => {
      const response = await request(app).get("/api/drivers");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should fetch an active driver", async () => {
      const response = await request(app).get("/api/drivers/active");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Employee Routes
  describe("Employee Routes", () => {
    it("should fetch all employees", async () => {
      const response = await request(app).get("/api/employees");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Grain Routes
  describe("Grain Routes", () => {
    it("should fetch all grains", async () => {
      const response = await request(app).get("/api/grains");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test MSWC Routes
  describe("MSWC Routes", () => {
    it("should fetch all godowns", async () => {
      const response = await request(app).get("/api/mswc");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should fetch an active godown", async () => {
      const response = await request(app).get("/api/mswc/active");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Owner Routes
  describe("Owner Routes", () => {
    it("should fetch all owners", async () => {
      const response = await request(app).get("/api/owners");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Packaging Routes
  describe("Packaging Routes", () => {
    it("should fetch all packaging materials", async () => {
      const response = await request(app).get("/api/packaging");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Transport Routes
  describe("Transport Routes", () => {
    it("should fetch all transport records", async () => {
      const response = await request(app).get("/api/transports");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should fetch an active transport record", async () => {
      const response = await request(app).get("/api/transports/active");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Truck Routes
  describe("Truck Routes", () => {
    it("should fetch all trucks", async () => {
      const response = await request(app).get("/api/trucks");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test Scheme Routes
  describe("Scheme Routes", () => {
    it("should fetch all schemes", async () => {
      const response = await request(app).get("/api/schemes");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  // Test SubGodown Routes
  describe("SubGodown Routes", () => {
    it("should fetch all sub-godowns", async () => {
      const response = await request(app).get("/api/subgodowns");
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});