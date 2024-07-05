import NavBar from "./NavBar";

export default function Layout({
   children,
}: {
  children: React.ReactNode;  
}) {
    return <>

    <div  className="h-dvh"> 
    <div className="h-full"><NavBar />
        <main className="p-4 max-w-7xl m-auto">{children}</main> </div> 
          
        </div>
    </>
}