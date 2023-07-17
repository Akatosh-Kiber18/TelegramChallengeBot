import React from "react";
import ResultForm from "../../components/ResultForm/ResultForm.jsx";

function AddResultPage({initData, tgApp}) {
    return (
        <div>
            <h1>Add Result Page</h1>
            <ResultForm userData={initData?.user} tgApp={tgApp}/>
        </div>
    );
}

export default AddResultPage;
