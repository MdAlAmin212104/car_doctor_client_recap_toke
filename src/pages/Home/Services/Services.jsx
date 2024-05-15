import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [asc, setAsc]= useState(true);
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetch(`https://car-doctor-steel.vercel.app/services?sort=${asc?'asc':'desc'}&search=${search}`)
            .then(res => res.json())
            .then(data => setServices(data));
    }, [asc, search])


    const handleSearch = e => {
        e.preventDefault();
        const search = e.target.search.value;
        console.log(search);
        setSearch(search);
    }

    return (
        <div className="mt-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
                <form onSubmit={handleSearch}>
                    <input type="text" name="search" />
                    <input type="submit" value="Search" className="btn" />
                </form>
                <button
                    className="btn btn-secondary"
                    onClick={()=>setAsc(!asc)}
                >
                    {
                        asc ? 'Price Low to High': 'Price High to low'
                    }
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service => <ServiceCard
                        key={service._id}
                        service={service}
                    ></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;