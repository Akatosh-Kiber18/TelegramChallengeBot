import React from "react";
import ResultForm from "../../components/ResultForm/ResultForm.jsx";

function AddResultPage({initData}) {
    return (
        <div>
            <h1>Add Result Page</h1>
            <ResultForm initData={initData}/>
        </div>
    );
}

export default AddResultPage;
