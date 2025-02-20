import React from 'react';
import { useForm } from '@inertiajs/react';

function Edit({ listings }) {
  const { data, setData, put, errors } = useForm({
    beds: listings.beds || '',
    baths: listings.baths || '',
    area: listings.area || '',
    city: listings.city || '',
    code: listings.code || '',
    street: listings.street || '',
    street_nr: listings.street_nr || '',
    price: listings.price || '',
      description: listings.description || ''
  });

  const update = (e) => {
    e.preventDefault();
    put(`/listing/${listings.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <form onSubmit={update}>
        <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
        <label className="label">Beds</label>
        <input  className="input"  type="number" name="beds" value={data.beds} onChange={handleChange} />
        {errors.beds && <div className="error">{errors.beds}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">Baths</label>
        <input className="input" type="number" name="baths" value={data.baths} onChange={handleChange} />
        {errors.baths && <div className="error">{errors.baths}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">Area</label>
        <input className="input" type="number" name="area" value={data.area} onChange={handleChange} />
        {errors.area && <div className="error">{errors.area}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">City</label>
        <input className="input" type="text" name="city" value={data.city} onChange={handleChange} />
        {errors.city && <div className="error">{errors.city}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">Post Code</label>
        <input className="input" type="text" name="code" value={data.code} onChange={handleChange} />
        {errors.code && <div className="error">{errors.code}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">Street</label>
        <input className="input" type="text" name="street" value={data.street} onChange={handleChange} />
        {errors.street && <div className="error">{errors.street}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">Street Nr</label>
        <input className="input" type="number" name="street_nr" value={data.street_nr} onChange={handleChange} />
        {errors.street_nr && <div className="error">{errors.street_nr}</div>}
      </div>

      <div className="col-span-2">
        <label className="label">Price</label>
        <input className="input" type="number" name="price" value={data.price} onChange={handleChange} />
        {errors.price && <div className="error">{errors.price}</div>}
      </div>

      
      <div className="col-span-2">
        <label className="label">Description</label>
        <textarea 
  className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500 h-40"
  name="description" 
  value={data.description} 
  onChange={handleChange} 
></textarea>

        {errors.description && <div className="error">{errors.description}</div>}
      </div>

      <div className="col-span-6">
        <button className="btn-primary" type="submit">Submit</button>
      </div>
      </div>
    </form>
  );
}    

export default Edit;
