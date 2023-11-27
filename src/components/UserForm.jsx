// src/UserForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

// import Sector from "./user"; // Update the path accordingly

// import "./UserForm.css"; // Import your CSS file

const UserForm = ({ setShowModal, setUsers }) => {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoadinge] = useState(false);

  const [allSectors, setAllSectors] = useState([]);

  const initialState = {
    name: "",
    sector: "",
    agree: false,
  };

  const [user, setUser] = useState({
    ...initialState,
  });

  const handleSelectChange = (e) => {
    setUser({
      ...user,
      sector: e.target.value.trim(), // Update to use the correct property
    });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      name: e.target.value.trim(),
    });
  };

  const handleCheckboxChange = () => {
    setAgree(!agree); // Toggle the state (true/false)
    setUser({
      ...user,
      agree: !agree, // Update user.isChecked based on isChecked
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}/allsectors`);
        setAllSectors(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const isFormValid = user.name !== "" && user.sectors !== "" && user.agree; // Check if isChecked is false

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadinge(true);
    if (isFormValid) {
      try {
        // Make a POST request to the backend route
        await axios
          .post(`${api}/sectors/add`, {
            username: user.name,
            description: user.sector,
            agree: user.agree,
          })
          .then((res) => {
            if (res.status === 200) {
              setUser(initialState);

              setShowModal(false);
              setLoadinge(false);
              navigate("/");

              setUsers((prevUsers) => [...prevUsers, res.data]);
            }
          });
      } catch (error) {
        console.error("Error saving user:", error);
        setLoadinge(false);
        alert(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="my-8 px-5 md:px-[42px]">
        <div className="flex  gap-2 items-center flex-row justify-center">
          <label htmlFor="name" className="mb-1 text-sm">
            Name
          </label>
          <input
            type="text"
            required
            id="name"
            name="name"
            onChange={handleChange}
            // onChange={handleNameChange}
            className="w-[310px] h-12 px-4 border border-cila-slate-200 text-cila-slate-700 focus:invalid:ring-0 focus:invalid:border-cila-red-300 invalid:text-cila-red-300 font-lotar focus:outline-none focus:ring-2 focus:ring-cila-slate-700 focus:border-transparent placeholder:font-lota autofill:bg-cila-slate-50 "
            placeholder="John"
          />
        </div>
        <div className="mt-5 mb-8">
          <div className="mt-5 flex lg:flex-row flex-col gap-2 justify-center items-center">
            <label htmlFor="sectors" className="lg:items-end lg:flex">
              Sectors:
            </label>

            <select
              id="sectors"
              // multiple
              size="10"
              // value={sectors}
              onChange={handleSelectChange}
              className="p-2 border-2 border-black"
              // onChange={handleSectorsChange}
            >
              {allSectors.map((sector) => (
                <React.Fragment key={sector._id}>
                  <option
                    value={sector.title}
                    className={`hover:bg-blue-500 p-1 hover:text-white cursor-pointer ${
                      sectors === sector._id ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    {sector.title}
                  </option>
                  {sector.data.map((item) => (
                    <React.Fragment key={item._id}>
                      <option
                        value={item.name}
                        className={`hover:bg-blue-500 p-1 hover:text-white cursor-pointer ${
                          sectors === item._id ? "bg-blue-600 text-white" : ""
                        }`}
                      >
                        {/* └─  */}
                        &nbsp;&nbsp;&nbsp;&nbsp; {item.name}
                      </option>

                      {item.value.length > 0 &&
                        item.value.map((item) => (
                          <option
                            // className="ml-5 hover:bg-gray-100 cursor-pointer"
                            key={item._id}
                            value={item.identifer}
                            className={`hover:bg-blue-500 p-1 hover:text-white cursor-pointer ${
                              sectors === item._id
                                ? "bg-blue-600 text-white"
                                : ""
                            }`}
                          >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {item.identifer}
                          </option>
                        ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </select>

            {/* <option value="1">Manufacturing</option>
              <option value="19">
                &nbsp;&nbsp;&nbsp;&nbsp;Construction materials
              </option>
              <option value="18">
                &nbsp;&nbsp;&nbsp;&nbsp;Electronics and Optics
              </option>
              <option value="6">
                &nbsp;&nbsp;&nbsp;&nbsp;Food and Beverage
              </option>
              <option value="342">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bakery &amp;
                confectionery products
              </option>
              <option value="43">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beverages
              </option>
              <option value="42">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fish &amp; fish
                products{" "}
              </option>
              <option value="40">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meat &amp; meat
                products
              </option>
              <option value="39">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Milk &amp; dairy
                products{" "}
              </option>
              <option value="437">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
              </option>
              <option value="378">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sweets &amp;
                snack food
              </option>
              <option value="13">&nbsp;&nbsp;&nbsp;&nbsp;Furniture</option>
              <option value="389">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bathroom/sauna{" "}
              </option>
              <option value="385">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bedroom
              </option>
              <option value="390">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children’s room{" "}
              </option>
              <option value="98">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen{" "}
              </option>
              <option value="101">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Living room{" "}
              </option>
              <option value="392">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Office
              </option>
              <option value="394">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                (Furniture)
              </option>
              <option value="341">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outdoor{" "}
              </option>
              <option value="99">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project
                furniture
              </option>
              <option value="12">&nbsp;&nbsp;&nbsp;&nbsp;Machinery</option>
              <option value="94">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
                components
              </option>
              <option value="91">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
                equipment/tools
              </option>
              <option value="224">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manufacture of
                machinery{" "}
              </option>
              <option value="97">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maritime
              </option>
              <option value="271">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aluminium
                and steel workboats{" "}
              </option>
              <option value="269">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boat/Yacht
                building
              </option>
              <option value="230">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ship
                repair and conversion
              </option>
              <option value="93">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal structures
              </option>
              <option value="508">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
              </option>
              <option value="227">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repair and
                maintenance service
              </option>
              <option value="11">&nbsp;&nbsp;&nbsp;&nbsp;Metalworking</option>
              <option value="67">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Construction of
                metal structures
              </option>
              <option value="263">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Houses and
                buildings
              </option>
              <option value="267">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal products
              </option>
              <option value="542">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal works
              </option>
              <option value="75">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CNC-machining
              </option>
              <option value="62">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgings,
                Fasteners{" "}
              </option>
              <option value="69">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gas,
                Plasma, Laser cutting
              </option>
              <option value="66">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIG,
                TIG, Aluminum welding
              </option>
              <option value="9">
                &nbsp;&nbsp;&nbsp;&nbsp;Plastic and Rubber
              </option>
              <option value="54">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Packaging
              </option>
              <option value="556">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic goods
              </option>
              <option value="559">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic
                processing technology
              </option>
              <option value="55">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blowing
              </option>
              <option value="57">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Moulding
              </option>
              <option value="53">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastics
                welding and processing
              </option>
              <option value="560">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic profiles
              </option>
              <option value="5">&nbsp;&nbsp;&nbsp;&nbsp;Printing </option>
              <option value="148">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advertising
              </option>
              <option value="150">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book/Periodicals
                printing
              </option>
              <option value="145">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labelling and
                packaging printing
              </option>
              <option value="7">
                &nbsp;&nbsp;&nbsp;&nbsp;Textile and Clothing
              </option>
              <option value="44">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clothing
              </option>
              <option value="45">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Textile
              </option>
              <option value="8">&nbsp;&nbsp;&nbsp;&nbsp;Wood</option>
              <option value="337">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other (Wood)
              </option>
              <option value="51">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden building
                materials
              </option>
              <option value="47">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden houses
              </option>
              <option value="3">Other</option>
              <option value="37">
                &nbsp;&nbsp;&nbsp;&nbsp;Creative industries
              </option>
              <option value="29">
                &nbsp;&nbsp;&nbsp;&nbsp;Energy technology
              </option>
              <option value="33">&nbsp;&nbsp;&nbsp;&nbsp;Environment</option>
              <option value="2">Service</option>
              <option value="25">
                &nbsp;&nbsp;&nbsp;&nbsp;Business services
              </option>
              <option value="35">&nbsp;&nbsp;&nbsp;&nbsp;Engineering</option>
              <option value="28">
                &nbsp;&nbsp;&nbsp;&nbsp;Information Technology and
                Telecommunications
              </option>
              <option value="581">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data processing,
                Web portals, E-marketing
              </option>
              <option value="576">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Programming,
                Consultancy
              </option>
              <option value="121">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software,
                Hardware
              </option>
              <option value="122">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Telecommunications
              </option>
              <option value="22">&nbsp;&nbsp;&nbsp;&nbsp;Tourism</option>
              <option value="141">
                &nbsp;&nbsp;&nbsp;&nbsp;Translation services
              </option>
              <option value="21">
                &nbsp;&nbsp;&nbsp;&nbsp;Transport and Logistics
              </option>
              <option value="111">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air
              </option>
              <option value="114">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rail
              </option>
              <option value="112">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Road
              </option>
              <option value="113">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Water
              </option> */}
          </div>
        </div>

        <div className="mt-5 flex flex-row  gap-2 justify-center items-center">
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={handleCheckboxChange}
            // onChange={handleAgreeChange}
          />
          <label htmlFor="agree">Agree to terms</label>
        </div>

        <button
          type="submit"
          disabled={!agree}
          className={`w-full mt-6 h-12 text-center text-white bg-cila-red-300 hover:bg-cila-red-400 md:h-14 sora-bold md:text-base ${
            isFormValid ? "" : "cursor-not-allowed opacity-50"
          }`}
        >
          Submit
          {loading && (
            <div role="status" className="inline ml-2">
              <svg
                ariaHidden="true"
                className="inline w-5 h-5 mr-2 text-white animate-spin dark:text-slate-50/70 fill-white dark:fill-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
        </button>
      </div>

      {/* <div className=" flex lg:flex-row flex-col gap-2 justify-center items-center ">
        <label htmlFor="name">Name:</label>
        <div className="border-2 border-black">
          <input
            type="text"
            id="name"
            className="w-full"
            value={name}
            onChange={handleNameChange}
          />
        </div>
      </div>
      <div className="mt-5 flex lg:flex-row flex-col gap-2 justify-center items-center">
        <label htmlFor="sectors" className="lg:items-end lg:flex">
          Sectors:
        </label>
        <select
          id="sectors"
          multiple
          size="5"
          value={sectors}
          className="p-2 border-2 border-black"
          onChange={handleSectorsChange}
        >
          <option value="1">Manufacturing</option>
          <option value="19">
            &nbsp;&nbsp;&nbsp;&nbsp;Construction materials
          </option>
          <option value="18">
            &nbsp;&nbsp;&nbsp;&nbsp;Electronics and Optics
          </option>
          <option value="6">&nbsp;&nbsp;&nbsp;&nbsp;Food and Beverage</option>
          <option value="342">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bakery &amp;
            confectionery products
          </option>
          <option value="43">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Beverages
          </option>
          <option value="42">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fish &amp; fish
            products{" "}
          </option>
          <option value="40">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Meat &amp; meat
            products
          </option>
          <option value="39">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Milk &amp; dairy
            products{" "}
          </option>
          <option value="437">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
          </option>
          <option value="378">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sweets &amp; snack
            food
          </option>
          <option value="13">&nbsp;&nbsp;&nbsp;&nbsp;Furniture</option>
          <option value="389">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bathroom/sauna{" "}
          </option>
          <option value="385">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bedroom
          </option>
          <option value="390">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Children’s room{" "}
          </option>
          <option value="98">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitchen{" "}
          </option>
          <option value="101">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Living room{" "}
          </option>
          <option value="392">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Office
          </option>
          <option value="394">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other (Furniture)
          </option>
          <option value="341">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Outdoor{" "}
          </option>
          <option value="99">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Project furniture
          </option>
          <option value="12">&nbsp;&nbsp;&nbsp;&nbsp;Machinery</option>
          <option value="94">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery components
          </option>
          <option value="91">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Machinery
            equipment/tools
          </option>
          <option value="224">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Manufacture of
            machinery{" "}
          </option>
          <option value="97">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Maritime
          </option>
          <option value="271">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aluminium
            and steel workboats{" "}
          </option>
          <option value="269">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Boat/Yacht
            building
          </option>
          <option value="230">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ship
            repair and conversion
          </option>
          <option value="93">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal structures
          </option>
          <option value="508">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
          </option>
          <option value="227">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Repair and
            maintenance service
          </option>
          <option value="11">&nbsp;&nbsp;&nbsp;&nbsp;Metalworking</option>
          <option value="67">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Construction of
            metal structures
          </option>
          <option value="263">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Houses and buildings
          </option>
          <option value="267">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal products
          </option>
          <option value="542">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Metal works
          </option>
          <option value="75">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CNC-machining
          </option>
          <option value="62">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgings,
            Fasteners{" "}
          </option>
          <option value="69">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gas,
            Plasma, Laser cutting
          </option>
          <option value="66">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIG,
            TIG, Aluminum welding
          </option>
          <option value="9">&nbsp;&nbsp;&nbsp;&nbsp;Plastic and Rubber</option>
          <option value="54">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Packaging
          </option>
          <option value="556">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic goods
          </option>
          <option value="559">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic processing
            technology
          </option>
          <option value="55">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Blowing
          </option>
          <option value="57">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Moulding
          </option>
          <option value="53">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastics
            welding and processing
          </option>
          <option value="560">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Plastic profiles
          </option>
          <option value="5">&nbsp;&nbsp;&nbsp;&nbsp;Printing </option>
          <option value="148">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Advertising
          </option>
          <option value="150">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Book/Periodicals
            printing
          </option>
          <option value="145">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Labelling and
            packaging printing
          </option>
          <option value="7">
            &nbsp;&nbsp;&nbsp;&nbsp;Textile and Clothing
          </option>
          <option value="44">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Clothing
          </option>
          <option value="45">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Textile
          </option>
          <option value="8">&nbsp;&nbsp;&nbsp;&nbsp;Wood</option>
          <option value="337">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other (Wood)
          </option>
          <option value="51">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden building
            materials
          </option>
          <option value="47">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Wooden houses
          </option>
          <option value="3">Other</option>
          <option value="37">
            &nbsp;&nbsp;&nbsp;&nbsp;Creative industries
          </option>
          <option value="29">&nbsp;&nbsp;&nbsp;&nbsp;Energy technology</option>
          <option value="33">&nbsp;&nbsp;&nbsp;&nbsp;Environment</option>
          <option value="2">Service</option>
          <option value="25">&nbsp;&nbsp;&nbsp;&nbsp;Business services</option>
          <option value="35">&nbsp;&nbsp;&nbsp;&nbsp;Engineering</option>
          <option value="28">
            &nbsp;&nbsp;&nbsp;&nbsp;Information Technology and
            Telecommunications
          </option>
          <option value="581">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Data processing, Web
            portals, E-marketing
          </option>
          <option value="576">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Programming,
            Consultancy
          </option>
          <option value="121">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Software, Hardware
          </option>
          <option value="122">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Telecommunications
          </option>
          <option value="22">&nbsp;&nbsp;&nbsp;&nbsp;Tourism</option>
          <option value="141">
            &nbsp;&nbsp;&nbsp;&nbsp;Translation services
          </option>
          <option value="21">
            &nbsp;&nbsp;&nbsp;&nbsp;Transport and Logistics
          </option>
          <option value="111">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Air
          </option>
          <option value="114">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rail
          </option>
          <option value="112">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Road
          </option>
          <option value="113">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Water
          </option>
        </select>
      </div>
      <div className="mt-5 flex flex-row  gap-2 justify-center items-center">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={handleAgreeChange}
        />
        <label htmlFor="agree">Agree to terms</label>
      </div>

      <button
        className="border-2 mt-5 border-blue-500  hover:border-blue-700  text-blue-500 hover:text-blue-700 font-bold py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button> */}
    </form>
  );
};

export default UserForm;
