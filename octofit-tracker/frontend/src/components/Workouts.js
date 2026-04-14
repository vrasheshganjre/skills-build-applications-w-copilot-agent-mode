import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/';
const API_URL = `${API_BASE}workouts/`;

function Workouts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching from:', API_URL);
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        const results = Array.isArray(json) ? json : json.results || [];
        setData(results);
        setLoading(false);
        console.log('Fetched workouts:', results);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching workouts:', err);
      });
  }, []);

  return (
    <div className="card mb-4 animate-fade-in">
      <div className="card-body">
        <h2 className="card-title mb-4">Workouts</h2>

        {loading ? (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  {data[0] && Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={item.id || idx} className="align-middle">
                    {data[0] && Object.keys(data[0]).map((key) => (
                      <td key={key}>{String(item[key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-primary glow" onClick={() => window.location.reload()}>Refresh</button>
          <small className="text-muted">Endpoint: {API_URL}</small>
        </div>
      </div>
    </div>
  );
}

export default Workouts;
