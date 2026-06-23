// src/app/supar-admin-panel/supar-admin-signup/layout.jsx
export const dynamic = "force-static";

export const metadata = {
    robots: "noindex, nofollow",
};

export default function SuperAdminSignUpLayout({ children }) {
    return (
        <main className="sa-standalone">
            {children}
        </main>
    );
}