import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import JsonData from '../jsondata.json'
import { getDockerData } from '../Redux/Auth/action'

export const ImportImg = ({ getDockerData }, props) => {
  useEffect(() => {
    // setData(JsosData)

    getDockerData()
    
  }, [])
  // ==================

  const [filteredData, setFilteredData] = useState(JsonData); // Initialize with your full data
  // const specificNameToSearch = 'Specific Name'; // Replace with the specific name you want to search for

  const handleSearch = (query) => {

    const filtered = JsonData.filter((item) =>
      // Use a regular expression to match names containing the query (case-insensitive)
      new RegExp(query, 'i').test(item.name)
    );
    // Sort the filtered data based on the 'name' property in ascending order
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    setFilteredData(filtered);
  };
  // =================
  return (
    <div className='w-full  overflow-y-scroll scrollbar  scrollbar-thin  scrollbar-thumb-gray-900 scrollbar-track-gray-500'>
      <div className=" flex flex-col justify-between items-center  w-full  pt-6 pointer-events">
        <div className="relative w-10/12 flex justify-between ">
          <svg className=" absolute w-4 h-4 inset-y-0 left-2 mt-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            id="default-search"
            className="block w-11/12 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          /> <button type="submit" className="text-white  right-2.5 bottom-2.5 bg-teal-400  hover:bg-teal-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-teal-400  dark:focus:ring-blue-800">Search</button>
        </div>
      </div>

      <div className='flex flex-col justify-center items-center '>
        {filteredData.map((x, y) => (
          <div key={y} style={{ backgroundColor: '#17222A' }} className="flex w-11/12 items-center justify-between p-2 my-4 pointer-events">
            <div className='flex justify-center items-center'>
              <svg className='ml-3' width="41" height="34" viewBox="0 0 41 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.5405 0.196731C20.1534 -0.0655785 20.8466 -0.0655768 21.4595 0.196735C24.5565 1.52222 27.6536 2.80552 30.7507 4.08882C33.6765 5.30113 36.6023 6.51345 39.528 7.76134C40.4218 8.14256 41 9.02386 41 9.99822V24.0018C41 24.9761 40.4218 25.8574 39.528 26.2387C36.6019 27.4868 33.6756 28.6993 30.7493 29.9118C27.6526 31.1949 24.556 32.478 21.4595 33.8033C20.8466 34.0656 20.1534 34.0656 19.5405 33.8033C16.4435 32.4778 13.3464 31.1945 10.2492 29.9111C7.32343 28.6988 4.39764 27.4865 1.47196 26.2387C0.578183 25.8574 0 24.9761 0 24.0018V9.99821C0 9.02385 0.578178 8.14256 1.47195 7.76134C4.39814 6.51323 7.32444 5.30071 10.2508 4.08818C13.3474 2.80509 16.444 1.522 19.5405 0.196731ZM36.4445 12.1841C36.4445 11.5132 36.9883 10.9693 37.6593 10.9693C38.3302 10.9693 38.8741 11.5132 38.8741 12.1841V23.4658C38.8741 24.1367 38.3302 24.6806 37.6593 24.6806C36.9883 24.6806 36.4445 24.1367 36.4445 23.4658V12.1841ZM33.1037 12.7974C32.4328 12.7974 31.8889 13.3413 31.8889 14.0122V25.2939C31.8889 25.9648 32.4328 26.5087 33.1037 26.5087C33.7747 26.5087 34.3185 25.9648 34.3185 25.2939V14.0122C34.3185 13.3413 33.7747 12.7974 33.1037 12.7974ZM27.3333 15.8404C27.3333 15.1695 27.8772 14.6256 28.5481 14.6256C29.2191 14.6256 29.7629 15.1695 29.7629 15.8404V27.1221C29.7629 27.793 29.2191 28.3369 28.5481 28.3369C27.8772 28.3369 27.3333 27.793 27.3333 27.1221V15.8404ZM22.4741 17.6685C22.4741 16.9976 23.018 16.4537 23.6889 16.4537C24.3598 16.4537 24.9037 16.9976 24.9037 17.6685V28.9502C24.9037 29.6211 24.3598 30.165 23.6889 30.165C23.018 30.165 22.4741 29.6211 22.4741 28.9502V17.6685Z" fill="#76CDB2" />
              </svg>
              <div className='ml-3 py-2'>
                <label className='text-white text-md font-semibold'>{x.name}</label>
                <i className='pl-3 text-teal-400 text-sm'>alpine/git</i>
                <p className='text-gray-400 text-sm font-normal'> version {x.version}</p>
              </div>
            </div>
            <button type="submit" className="text-white  right-2.5 bottom-2.5 current-pointer  hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-gray-400  dark:focus:ring-gray-700">Pull Image</button>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = { getDockerData }

export default connect(mapStateToProps, mapDispatchToProps)(ImportImg)