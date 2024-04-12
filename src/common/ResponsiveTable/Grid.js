import React from "react";

function Rowx() {
  return (
    <>
      <tr>
        <td>
          <div class="user-info">
            <div class="profileImage1">O</div>

            <div class="user-info__basic">
              <h5 class="mb-0">Omnath Dubey</h5>
              <p class="text-muted mb-0">Male</p>
            </div>
          </div>
        </td>

        <td>
          <h6 class="mb-0">@omnath</h6>
        </td>
        <td>
          <h6 class="mb-0">@dubeyji</h6>
        </td>
        <td>
          <h6 class="mb-0"> +91 9838381169</h6>
        </td>
        <td>
          <h6 class="mb-0"> omnathdubey15@gmail.com</h6>
        </td>

        <td>
          <div class="dropdown open">
            <a
              href="#!"
              class=""
              id="triggerId1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v"></i>
            </a>
            <div class="dropdown-menu" aria-labelledby="triggerId1">
              <a class="dropdown-item" href="#">
                <i class="fa fa-pencil mr-1"></i> Edit
              </a>
              <a class="dropdown-item text-danger" href="#">
                <i class="fa fa-trash mr-1"></i> Delete
              </a>
              <a class="dropdown-item text-sucsess" href="#">
                <i class="fa fa-share-alt"> Share</i>
              </a>
              <a class="dropdown-item text-sucsess" href="#">
                <i class="fa fa-save"> Save</i>
              </a>
              <a class="dropdown-item text-sucsess" href="#">
                <i class="fa fa-heart"> like</i>
              </a>
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}

function Table() {
  return (
    <div class="container">
      <table class="table">
        <tbody class="responsive">
          <tr className="rung">
            <th> Full Name </th>

            <th> User ID </th>
            <th> User Name </th>
            <th> Mobile No </th>
            <th> Email ID </th>
            <th> Edit </th>
          </tr>
          <Rowx />
          <Rowx />
          <Rowx />
          <Rowx />
          <Rowx />
        </tbody>
      </table>
    </div>
  );
}

export default Table;