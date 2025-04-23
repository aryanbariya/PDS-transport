import React from 'react'
import { useEffect, useState } from 'react'

const URL = import.meta.env.VITE_API_BACK_URL;

function FirstTapaReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/api/fristreport`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching transport data:', err);
      });
  }, []);

  return (
    <div className="p-4">
    <h2 className="text-xl font-bold mb-4">First Transport Report</h2>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">DO No</th>
              <th className="px-4 py-2">Truck</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Empty Weight</th>
              <th className="px-4 py-2">Gross Weight</th>
              <th className="px-4 py-2">Net Weight</th>
              <th className="px-4 py-2">Dispatch Date</th>
            </tr>
          </thead>
          <tbody>
            {transportList.map((transport, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{transport.doNo}</td>
                <td className="px-4 py-2">{transport.truck}</td>
                <td className="px-4 py-2">{transport.owner}</td>
                <td className="px-4 py-2">{transport.driver}</td>
                <td className="px-4 py-2">{transport.emptyWeight}</td>
                <td className="px-4 py-2">{transport.grossWeight}</td>
                <td className="px-4 py-2">{transport.netWeight}</td>
                <td className="px-4 py-2">{transport.dispatchDate?.slice(0,10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  )
}

export default FirstTapaReport


