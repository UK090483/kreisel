import { Session } from "next-auth";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import React, { ReactElement, ReactNode } from "react"


type MitgliederBereichProps = {
    session:Session | null
}

const MitgliederBereich:React.FC<MitgliederBereichProps>&{getLayout:(page: ReactElement) => ReactNode} = (props)=>{
return <div className=" w-full h-screen flex items-center justify-center">MitgliederBereich { props.session?.user?.email}</div>
}

MitgliederBereich.getLayout = function getLayout(page) {
  return (
    <div className=" bg-blue-400 ">
      {page}
    </div>
  )
}

export const getServerSideProps:GetServerSideProps =async (ctx)=> {
   const session = await getSession(ctx)
   if (!session){
    return {
        redirect: {
          destination: '/api/auth/signin',
          permanent: false,
        },
      }
   }
  return {
    props: {
      session
    }
  }
}

export default MitgliederBereich