const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-4">
      <footer className="text-center">
        <p className="text-sm font-medium">
          &copy; 2024 Decipher Event |{" "}
          {/* <a
            target="_blank"
            href="/team/leaderboard"
            className="text-blue-400 hover:text-blue-600 underline transition duration-300"
          >
            LeaderBoard
          </a> */}
          {" "}
          |{" "}
          <a
            target="_blank"
            href="/rules"
            className="text-blue-400 hover:text-blue-600 underline transition duration-300"
          >
            Rules
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
