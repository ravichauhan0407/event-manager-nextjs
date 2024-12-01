import AddEventTIle from "@/components/AddEventTIle";
import ModalContainer from "@/components/ModalContainer";
import React from "react";
import { getEventById } from "../api/data";

const page = async ({ params }) => {
  const { id } = await params;

  const res = await getEventById({ id });
  const data = res.data;

  return (
    <div>
      <ModalContainer title={`Edit Event (${data.date})`} open={true}>
        <AddEventTIle details={data} />
      </ModalContainer>
    </div>
  );
};

export default page;
