export default function () {
  const StudyAndMode = () => {
    return (
      <>
        {/* study and mode */}
        <div className="text-center">
          <h1 className=" py-10 font-extrabold text-6xl bg-clip-text text-white">
            Study
          </h1>
          <div>
            <label
              htmlFor="large-toggle"
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value=""
                id="large-toggle"
                // checked
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <StudyAndMode />
      <form className="px-2 py-2 text-white text-center">
        <input type="radio" name="bio" id="home" defaultChecked />
        <label className="px-2 text-white" htmlFor="home">
          Home
        </label>
        <input type="radio" name="bio" id="Office" />
        <label className="px-2 text-white" htmlFor="Office">
          Office
        </label>
        <input type="radio" name="bio" id="coffe" />
        <label className="px-2 text-white" htmlFor="coffe">
          Coffee
        </label>
        <br />
        <label className="px-2 text-white text-right" htmlFor="task">
          Task
        </label>
        <br />
        <input
          className="bg-rose-500 text-white"
          type="text"
          placeholder="Enter task...."
        />
        <br />
      </form>
    </>
  );
}
