import { NextRequest } from "next/server";
import  Jwt  from "jsonwebtoken";



export const getDataFromToken=(req: NextRequest)=>{

      try {
         
        const encodedToken= req.cookies.get("token")?.value || "";

      const decodedToken:any=  Jwt.verify(encodedToken, process.env.TOKEN_SECRET! )

      return decodedToken.id;
        
      } catch (error) {
        console.error("Error extracting data from token:", error);
        
        throw new Error("Invalid token");
      }
}
