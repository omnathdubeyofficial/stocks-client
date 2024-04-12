import React from "react";

function Cardx() {
  return (

      <div>
        <div class="card">
          <div class="card-header">
            <div>
              <a
                href="#!"
                class="omnath"
                id="triggerId1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fa fa-ellipsis-v "></i>
              </a>
              <div class="dropdown-menu" aria-labelledby="triggerId1">
                <a class="dropdown-item" href="#">
                  <i class="fa fa-pencil mr-1"></i> Edit
                </a>
                <a class="dropdown-item text-danger" href="#">
                  <i class="fa fa-trash mr-1"></i> Delete
                </a>
                <a class="dropdown-item text-sucsess" href="#">
                  <i class="fa fa-share-alt"></i> Share
                </a>
                <a class="dropdown-item text-sucsess" href="#">
                  <i class="fa fa-save"></i> Save
                </a>
                <a class="dropdown-item text-sucsess" href="#">
                  <i class="fa fa-heart"></i> like
                </a>
              </div>
            </div>
            <div class="profileImage">O</div>
          </div>
          <h5> Omnath Dubey</h5>
          <p>Male</p>
          <p>
            <h6 class="mb-0">
              {" "}
              <b>User Name - </b> @omnath
            </h6>
          </p>
          <p>
            <h6 class="mb-0">
              {" "}
              <b>User ID - </b> @dubeyji
            </h6>
          </p>
          <p>
            <h6 class="mb-0">
              {" "}
              <b>Mobile - </b>+91 9838381169
            </h6>
          </p>
          <p>
            <h6 class="mb-0">
              {" "}
              <b>Email ID - </b> omnathdubey15@gmail.com
            </h6>
          </p>
        </div>
      </div>
    
  );
}

function CardList() {
  return (
    <div>
      <Cardx />
      <Cardx />

      <Cardx />

      <Cardx />

      <Cardx />

      <Cardx />
    </div>
  );
}

export default CardList;