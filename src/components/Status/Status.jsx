import GoogleChar from "../Report/GoogleChar";
import Display from "../Study/Display";
import Timer from "../Study/timer";


function Status() {
    return ( 
        <>
        {/* <Display/> */}
        <div className="feebackAndTime">
        <Timer/>
        </div>
        </>
     );
}

export default Status;