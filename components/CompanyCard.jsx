import React from "react";
import { MapPin, Users, Calendar } from "lucide-react";

export default function CompanyCard({ company }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
        <h3 className="text-xl font-bold text-white mb-2">{company.name}</h3>
        <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {company.industry}
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center text-gray-700">
          <MapPin size={18} strokeWidth={2} className="mr-3 text-purple-600" />
          <span>
            <span className="font-semibold">Location:</span> {company.location}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <Users size={18} strokeWidth={2} className="mr-3 text-purple-600" />
          <span>
            <span className="font-semibold">Employees:</span>{" "}
            {company.employees}
          </span>
        </div>

        <div className="flex items-center text-gray-700">
          <Calendar
            size={18}
            strokeWidth={2}
            className="mr-3 text-purple-600"
          />
          <span>
            <span className="font-semibold">Founded:</span> {company.founded}
          </span>
        </div>
      </div>
    </div>
  );
}