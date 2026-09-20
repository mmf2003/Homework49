import { useEffect, useState } from "react";

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users/1",
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await response.json();

                setUser(data);
            } catch {
                setError("Failed to load user");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p role="alert">{error}</p>;
    }

    return (
        <div className="user-profile">
            <h2>User Profile</h2>

            <p>
                <strong>Name:</strong> {user.name}
            </p>

            <p>
                <strong>Email:</strong> {user.email}
            </p>

            <p>
                <strong>Phone:</strong> {user.phone}
            </p>

            <p>
                <strong>Website:</strong> {user.website}
            </p>
        </div>
    );
}

export default UserProfile;
