import { useState } from "react";

const ToBase64 = (event: any) => {
    const [base64, setBase64] = useState('');
    const file = event;
    const reader = new FileReader();

    reader.onload = ((theFile) => {
        return function (e: any) {
            var binaryData: string | null = e.target.result;

            if (binaryData) {
                var base64String:string = window.btoa(binaryData);
                setBase64(base64String)
            }
        }
    })
    reader.readAsBinaryString(file);
    console.log(base64)
    return base64;
}

export default ToBase64