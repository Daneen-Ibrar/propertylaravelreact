import React from 'react';
import { useForm } from '@inertiajs/react';

function Create() {
  const { data, setData, post, errors } = useForm({
    beds: '',
    baths: '',
    area: '',
    city: '',
    code: '',
    street: '',
    street_nr: '',
    price: '',
    description: ""
  });

  const create = (e) => {
    e.preventDefault();
    post('/listing');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <form onSubmit={create}>
     <div className="grid grid-cols-6 gap-4">
      <div className="col-span-2">
      <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Beds</label>
        <input  className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="number" name="beds" value={data.beds} onChange={handleChange} />
        {errors.beds && <div className="error">{errors.beds}</div>}
      </div>

      <div className="col-span-2">
      <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Baths</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="number" name="baths" value={data.baths} onChange={handleChange} />
        {errors.baths && <div className="error">{errors.baths}</div>}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Area</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="number" name="area" value={data.area} onChange={handleChange} />
        {errors.area && <div className="error">{errors.area}</div>}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">City</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="text" name="city" value={data.city} onChange={handleChange} />
        {errors.city && <div className="error">{errors.city}</div>}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Post Code</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="text" name="code" value={data.code} onChange={handleChange} />
        {errors.code && <div className="error">{errors.code}</div>}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Street</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="text" name="street" value={data.street} onChange={handleChange} />
        {errors.street && <div className="error">{errors.street}</div>}
      </div>
      <div className="col-span-2">
        <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Street Nr</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="number" name="street_nr" value={data.street_nr} onChange={handleChange} />
        {errors.street_nr && <div className="error">{errors.street_nr}</div>}
      </div>

      <div className="col-span-2">
        <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Price</label>
        <input className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500" type="number" name="price" value={data.price} onChange={handleChange} />
        {errors.price && <div className="error">{errors.price}</div>}
      </div>

      <div className="col-span-6">
  <label className="block mb-1 text-gray-500 dark:text-gray-300 font-medium">Description (include contact details)</label>
  <textarea 
    className="block w-full p-2 rounded-md shadow-sm border border-gray-300 dark:border-gray-600 text-gray-500"
    name="description" 
    value={data.description} 
    onChange={handleChange} 
    rows="4"
  ></textarea>
  {errors.description && <div className="error">{errors.description}</div>}
</div>


      <div className="col-span-6">
        <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium p-2 rounded-md">Create</button>
      </div>
      </div>
    </form>
  );
}

export default Create;
