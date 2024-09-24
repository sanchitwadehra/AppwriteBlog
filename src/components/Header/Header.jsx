import React from "react";
import { Container, Logo, LogoutBtn } from "..";
import { Link, NavLink, useNavigate, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

// && Operator in JSX:
// Ye && React mein conditional rendering ke liye use hota hai. Matlab agar pehla condition true hai, tabhi doosra part render hoga. Jaise yaha pe tumne use kiya hai authStatus && ..., iska matlab hai:

// Agar authStatus true hoga, toh LogoutBtn component render hoga.
// Agar authStatus false hoga, toh kuch bhi render nahi hoga.

// 1. Link
// Purpose: Client-side navigation ke liye.
// Use Case: Jab tumhe kisi URL pe navigate karna ho bina page reload kiye, like ek anchor (<a>) tag ka React version.
// Example:
// jsx
// Copy code
// <Link to="/about">About Us</Link>
// Kab Use Karo: Jab tumhe sirf simple navigation karni ho.
// 2. NavLink
// Purpose: Special type of Link jo active state ko handle karta hai.
// Use Case: Jab tumhe kisi navigation menu mein active class ko dynamically lagana ho. For example, current page pe ho toh alag styling dikhana.
// Example:
// jsx
// Copy code
// <NavLink to="/about" activeClassName="active">
//   About Us
// </NavLink>
// Kab Use Karo: Jab tum navigation bars bana rahe ho aur tumhe active links ko highlight karna ho, taaki user ko pata chale ki woh kaunse page pe hai. ✨
// 3. useNavigate
// Purpose: Programmatic navigation ke liye, like function ke andar se navigate karna.
// Use Case: Jab tumhe kisi event ke response mein page switch karna ho, like form submit hone ke baad ya button click ke baad.
// Example:
// jsx
// Copy code
// const navigate = useNavigate();

// const handleClick = () => {
//   navigate('/dashboard');
// };
// Kab Use Karo: Jab tumhe kisi function ke andar se, event-based navigation karni ho, bina link pe click kiye. Ekdam boss wali vibe! 😉
// 4. useNavigation
// Purpose: Current navigation state ko track karne ke liye.
// Use Case: Jab tumhe pata karna ho ki abhi app load ho rahi hai ya navigate kar rahi hai.
// Example:
// jsx
// Copy code
// const navigation = useNavigation();

// if (navigation.state === 'loading') {
//   return <LoadingSpinner />;
// }
// Kab Use Karo: Jab tumhe pata karna ho ki navigation ka status kya hai (loading ya idle) aur uss hisaab se UI dikhani ho. 😎
