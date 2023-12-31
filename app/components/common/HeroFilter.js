"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroFilter = () => {
  const router = useRouter();
  const [carBrands, setCarBrands] = useState([]);
  const [isBrandsLoading, setIsBrandsLoading] = useState(true);
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [carModels, setCarModels] = useState([]);
  const [isModelsLoading, setIsModelsLoading] = useState(false);

  useEffect(() => {
    setIsBrandsLoading(true);
    const apiUrl = 'https://api.univolenitsolutions.com/v1/automobile/get/carbrands/for/65538448b78add9eaa02d417';
    const apiKey = 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj'; // Replace with your actual API key

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.data && data.data.carBrandsList) {
        setCarBrands(data.data.carBrandsList);
      }
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    })
    .finally(() => setIsBrandsLoading(false));
  }, []);

  useEffect(() => {
    const apiKey = 'GCMUDiuY5a7WvyUNt9n3QztToSHzK7Uj';
    if (selectedBrandId) {
      setIsModelsLoading(true);
      fetch(`https://api.univolenitsolutions.com/v1/automobile/get/carmodels/${selectedBrandId}/for/65538448b78add9eaa02d417`,
       {
        method: 'GET',
        headers: {
          'X-API-Key': apiKey,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && data.data && data.data.carModelsList) {
          setCarModels(data.data.carModelsList);
        }
      })
      .catch(error => {
        console.error('Error fetching car models: ', error);
      })
      .finally(() => setIsModelsLoading(false));
    }
  }, [selectedBrandId]);

  const handleBrandChange = (event) => {
    setSelectedBrandId(event.target.value);
    setCarModels([]); // Reset car models when brand changes
  };

  return (
    <div className="col-lg-12">
      {/* Filter tabs */}
      <div className="adss_bg_stylehome1">
        <div className="home1_advance_search_wrapper">
          <ul className="mb0 text-center">
            {/* Brand Selection */}
            <li className="list-inline-item">
              <div className="select-boxes">
                <div className="car_brand">
                  <h6 className="title">Make</h6>
                  <select className="form-select" onChange={handleBrandChange} value={selectedBrandId}>
                    <option value="">{isBrandsLoading ? "Loading..." : "Select Makes"}</option>
                    {carBrands.map(brand => (
                      <option key={brand._id} value={brand._id}>{brand.brandName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
            {/* Model Selection */}
            <li className="list-inline-item">
              <div className="select-boxes">
                <div className="car_brand">
                  <h6 className="title">Models</h6>
                  <select className="form-select" disabled={!selectedBrandId || isModelsLoading}>
                    <option value="">{isModelsLoading ? "Loading..." : "Select Models"}</option>
                    {carModels.map(model => (
                      <option key={model._id} value={model._id}>{model.modelName}</option>
                    ))}
                  </select>
                </div>
              </div>
            </li>
            {/* Additional filters can be added similarly */}
            
            {/* Search button */}
            <li className="list-inline-item">
              <div className="d-block">
                <button
                  onClick={() => router.push("/listing-v4")}
                  className="btn btn-thm advnc_search_form_btn"
                >
                  <span className="flaticon-magnifiying-glass" />
                  Search
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroFilter;
