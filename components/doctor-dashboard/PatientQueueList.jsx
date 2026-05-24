"use client";

import { useRouter } from "next/navigation";

// components/doctor-dashboard/PatientQueueList.jsx
export default function PatientQueueList({ appointments }) {
  const router = useRouter();

  return (
    <div>
      <div className="section-header-dashboard">
        <h2 className="section-title">
          Pending Patients
          <span className="section-count-badge">{appointments?.length}</span>
        </h2>
        <a
          href="/doctor-portal/patient-queue"
          onClick={(e) => {
            e.preventDefault();
            router.push("/doctor-portal/patient-queue");
          }}
          className="view-all-link"
        >
          View All

          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>

      <div className="patient-queue-list">
        {appointments?.map((patient, index) => (
          <div
            key={patient?.id}
            className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-3 py-2.5 shadow-sm"
          >
            <div className="flex min-w-0 items-center  gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#428a26] text-[11px] font-semibold text-white">
                {index + 1}
              </span>

              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                {patient?.patient?.avatar ? (
                  <img
                    src={patient?.patient?.avatar}
                    alt={patient?.patient?.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold text-gray-900">
                  {patient?.patient?.fullName}
                </h4>

                <p className="truncate text-xs text-gray-500">
                  {patient?.patient?.age}Y • {patient?.patient?.gender}
                </p>

                <p className="max-w-[180px] truncate text-xs text-gray-700">
                  {patient?.reason}
                </p>
              </div>
            </div>

            <div className="ml-3 flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-[11px] font-medium text-gray-800">
                  {new Date(patient?.startTime).toLocaleDateString("en-BD", {
                    day: "2-digit",
                    month: "short",
                  })}
                </p>

                <p className="text-[11px] text-gray-500">
                  {new Date(patient?.startTime).toLocaleTimeString("en-BD", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="flex gap-1.5">
                <button className="btn-queue-action btn-accept">
                  Accept
                </button>

                <button className="btn-queue-action btn-reject">
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => router.push("/doctor-portal/patient-queue")}
        className="view-all-queue-btn">View All Queue
      </button>
    </div>
  );
}