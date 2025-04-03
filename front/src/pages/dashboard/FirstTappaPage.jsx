          <table ref={tableRef} className="display w-full border border-gray-300 bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Base Depo</th>
                <th className="border p-2 text-left">DO Number</th>
                <th className="border p-2 text-left">Godown</th>
                <th className="border p-2 text-left">Truck</th>
                <th className="border p-2 text-left">Owner</th>
                <th className="border p-2 text-left">Driver</th>
                <th className="border p-2 text-left">Empty Weight</th>
                <th className="border p-2 text-left">Gross Weight</th>
                <th className="border p-2 text-left">Scheme</th>
                <th className="border p-2 text-left">Packaging</th>
                <th className="border p-2 text-left">No of Bags</th>
                <th className="border p-2 text-left">Bardan Weight</th>
                <th className="border p-2 text-left">Loaded Net Weight</th>
                <th className="border p-2 text-left">Net Weight</th>
                <th className="border p-2 text-left">Dispatch Date</th>
                <th className="border p-2 text-left">Quota</th>
                <th className="border p-2 text-left">TP No</th>
                <th className="border p-2 text-left">Allocation</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transports.map((transport) => (
                <tr key={transport.uuid} className="hover:bg-gray-100">
                  <td className="border p-2 text-left">{transport.order_number}</td>
                  <td className="border p-2 text-left">{transport.baseDepo}</td>
                  <td className="border p-2 text-left">{transport.doNo}</td>
                  <td className="border p-2 text-left">{transport.godown}</td>
                  <td className="border p-2 text-left">{transport.truck}</td>
                  <td className="border p-2 text-left">{transport.owner}</td>
                  <td className="border p-2 text-left">{transport.driver}</td>
                  <td className="border p-2 text-left">{transport.emptyWeight}</td>
                  <td className="border p-2 text-left">{transport.grossWeight}</td>
                  <td className="border p-2 text-left">{transport.scheme}</td>
                  <td className="border p-2 text-left">{transport.packaging}</td>
                  <td className="border p-2 text-left">{transport.noOfBags}</td>
                  <td className="border p-2 text-left">{transport.bardanWeight}</td>
                  <td className="border p-2 text-left">{transport.loadedNetWeight}</td>
                  <td className="border p-2 text-left">{transport.netWeight}</td>
                  <td className="border p-2 text-left">{transport.dispatchDate}</td>
                  <td className="border p-2 text-left">{transport.quota}</td>
                  <td className="border p-2 text-left">{transport.tpNo}</td>
                  <td className="border p-2 text-left">{transport.allocation}</td>
                  <td className="border p-2 text-left">
                    <div className="flex justify-start space-x-2">
                      <button
                        onClick={() => handleEdit(transport)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(transport.uuid)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 