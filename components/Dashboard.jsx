"use client";

import { useState, useEffect } from "react";
import CompanyCard from "@/components/CompanyCard";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import companiesData from "@/data/companies.json";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      setCompanies(companiesData.companies);
      setFilteredCompanies(companiesData.companies);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let result = [...companies];
    if (searchTerm) {
      result = result.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry) {
      result = result.filter(
        (company) => company.industry === selectedIndustry
      );
    }

    if (selectedLocation) {
      result = result.filter(
        (company) => company.location === selectedLocation
      );
    }

    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "employees") {
        comparison = a.employees - b.employees;
      } else if (sortBy === "founded") {
        comparison = a.founded - b.founded;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredCompanies(result);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedIndustry,
    selectedLocation,
    sortBy,
    sortOrder,
    companies,
  ]);

  const industries = [...new Set(companies.map((c) => c.industry))];
  const locations = [...new Set(companies.map((c) => c.location))];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCompanies = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedIndustry("");
    setSelectedLocation("");
    setSortBy("name");
    setSortOrder("asc");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">
            Loading companies...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
            🏢 Companies Directory
          </h1>
          <p className="text-gray-600 text-lg">
            Explore and filter companies from around the world
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          industries={industries}
          locations={locations}
          resetFilters={resetFilters}
        />

        {currentCompanies.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No companies found
            </h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
}