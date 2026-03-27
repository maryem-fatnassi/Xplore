import React, { useState, useEffect } from 'react';
import ChallengeCard from './ChallengeCard';

// const MyJoinedChallenges = () => {
//     const [challenges, setChallenges] = useState([]);
//     const [loading, setLoading] = useState(true);


//     // useEffect(() => {
//     //     // if (user?._id) {
//     //     //     axios.get(`http://localhost:5000/api/my-challenges/${user._id}`)
//     //     //         .then(res => {
//     //     //             setChallenges(res.data);
//     //     //             setLoading(false);
//     //     //         })
//     //     //         .catch(err => console.error(err));
//     //     // }
//     // // 1. Get user from localStorage
//     // const storedUser = JSON.parse(localStorage.getItem("user"));
    
//     // if (storedUser && storedUser._id) {
//     //     // 2. Use the _id in the URL
//     //     fetch(`http://localhost:5000/api/my-challenges/${storedUser._id}`)
//     //         .then(res => {
//     //             if (!res.ok) throw new Error("Failed to fetch");
//     //             return res.json();
//     //         })
//     //         .then(data => {
//     //             setChallenges(data);
//     //             setLoading(false);
//     //         })
//     //         .catch(err => {
//     //             console.error("Error:", err);
//     //             setLoading(false);
//     //         });
//     // }
//     // }, []);
// useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log("Raw Data from LocalStorage:", user);
//     console.log("Logged in User ID:", user?.id); // 
//     if (user?._id) {
//         fetch(`http://localhost:5000/api/my-challenges/${user.id}`)
//             .then(res => res.json())
//             .then(data => {
//                 console.log("Data from Backend:", data); 
//                 setChallenges(data);
//                 setLoading(false);
//             })
//             .catch(err => console.error("Fetch Error:", err));
//     }
// }, []);
//     return (
//         <div style={{ backgroundColor: '#1E3A8A', minHeight: '100vh', padding: '50px' }}>
//             <h1 style={{ color: '#fff', textAlign: 'center', marginBottom: '40px' }}>
//                 Joined <span style={{ color: '#FB923C' }}>Challenges</span>
//             </h1>

//             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 {challenges.length > 0 ? (
//                     challenges.map(item => (
//                         <ChallengeCard key={item.id} challenge={item} />
//                     ))
//                 ) : (
//                     <p style={{ color: '#cccccc75' }}>You haven't joined any challenges yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

const MyJoinedChallenges = () => {
    const [challenges, setChallenges] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?.id;

        if (userId) {
            fetch(`http://localhost:5000/api/my-challenges/${userId}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Fetched successfully:", data);
                    // تأكد أننا نضع المصفوفة مباشرة في الـ State
                    setChallenges(Array.isArray(data) ? data : []);
                    // setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    // setLoading(false);
                });
        }
    }, []);

    // if (loading) return <div style={{color: '#fff', textAlign: 'center', marginTop: '50px'}}>Loading your adventures...</div>;

    return (
        <div style={styles.pageWrapper}>
            <h1 style={styles.heading}>My <span style={{color: '#FB923C'}}>Challenges</span></h1>
            
            <div style={styles.container}>
                {challenges.length > 0 ? (
                    challenges.map((item) => (
                        <ChallengeCard key={item.id} challenge={item} />
                    ))
                ) : (
                    <div style={styles.noData}>
                        <p>You haven't joined any challenges yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    pageWrapper: {
        backgroundColor: '#0b1120',
        minHeight: '100vh',
        padding: '40px 20px'
    },
    heading: {
        color: '#fff',
        textAlign: 'center',
        fontSize: '2.5rem',
        marginBottom: '40px',
        textTransform: 'uppercase',
        letterSpacing: '2px'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '25px',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    noData: {
        color: '#cccccc75',
        fontSize: '1.2rem',
        textAlign: 'center',
        marginTop: '50px',
        width: '100%'
    }
};


export default MyJoinedChallenges;