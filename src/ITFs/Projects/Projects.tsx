import React from 'react'

function Projects() {
  console.log('in Projects')
  return (
    <div className="projects">
      <div className="card_itss">
        <div className="card-header">
          <h3>Recent Project</h3>
          <button>
            See all <span className="las la-arrow-right"></span>
          </button>
        </div>
        <div className="card-body">
          <div className="table-response">
            <table width="100%">
              <thead>
                <tr>
                  <td>Project Title</td>
                  <td>Deplartment</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>UX/UI Design</td>
                  <td>UI Team</td>
                  <td>
                    <span className="status purple"></span>In progress
                  </td>
                </tr>
                <tr>
                  <td>UX/ushop App</td>
                  <td>Mobile Team</td>
                  <td>
                    <span className="status orange"></span>Review
                  </td>
                </tr>
                <tr>
                  <td>Web developement</td>
                  <td>Frontend Team</td>
                  <td>
                    <span className="status pink"></span>In progress
                  </td>
                </tr>
                <tr>
                  <td>UX/UI Design</td>
                  <td>UI Team</td>
                  <td>
                    <span className="status purple"></span>In progress
                  </td>
                </tr>
                <tr>
                  <td>UX/ushop App</td>
                  <td>Mobile Team</td>
                  <td>
                    <span className="status orange"></span>Review
                  </td>
                </tr>
                <tr>
                  <td>Web developement</td>
                  <td>Frontend Team</td>
                  <td>
                    <span className="status pink"></span>In progress
                  </td>
                </tr>
                <tr>
                  <td>UX/UI Design</td>
                  <td>UI Team</td>
                  <td>
                    <span className="status purple"></span>In progress
                  </td>
                </tr>
                <tr>
                  <td>UX/ushop App</td>
                  <td>Mobile Team</td>
                  <td>
                    <span className="status orange"></span>Review
                  </td>
                </tr>
                <tr>
                  <td>Web developement</td>
                  <td>Frontend Team</td>
                  <td>
                    <span className="status pink"></span>In progress
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
