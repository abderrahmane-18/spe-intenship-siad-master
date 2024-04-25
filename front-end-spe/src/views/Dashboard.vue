<script setup>
import { ref } from "vue"

const toggled = ref('')
const sidebarToggleTop = () => {
    if (toggled.value === '') {
        toggled.value = 'toggled'
    } else {
        toggled.value = ''
    }
}
</script>

<template>

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bootstrap 5 Migrate Tool Test Page</title>
    <meta name="description" content="Test HTML page for the Bootstrap 4 to Bootstrap 5 Migrate Tool Script" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22>⚡</text></svg>" />
    <link rel="author" href="https://christianoliff.com/" />
    <link rel="license" href="https://github.com/coliff/bootstrap-5-migrate-tool/blob/main/LICENSE" />
  </head>

  <body class="container">
    <div id="wrapper">

      <!-- Sidebar -->
      <ul :class="`navbar-nav bg-gradient-primary sidebar sidebar-dark accordion `" id="accordionSidebar">
      
          <!-- Sidebar - Brand -->
          <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
              <div class="sidebar-brand-icon rotate-n-15">
                  <i class="fas fa-code"></i>
              </div>
              <div class="sidebar-brand-text mx-3">SPE <sup>Jijel</sup></div>
          </a>
      
          <!-- Divider -->
          <hr class="sidebar-divider my-0">
      
          <!-- Nav Item - Dashboard -->
          <li class="nav-item active">
              <a class="nav-link" href="index.html">
                  <i class="fas fa-fw fa-tachometer-alt"></i>
                  <span>Dashboard</span></a>
          </li>
      
          <!-- Divider -->
          <hr class="sidebar-divider">
      
          <!-- Heading -->
          <div class="sidebar-heading">
              Interface
          </div>
      
          <!-- Nav Item - Pages Collapse Menu -->
          <li class="nav-item">
              <a class="nav-link collapsed" href="#" aria-expanded="true" aria-controls="collapseTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                  <i class="fas fa-fw fa-cog"></i>
                  <span>Components</span>
              </a>
              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                  <div class="bg-white py-2 collapse-inner rounded">
                      <h6 class="collapse-header">Custom Components:</h6>
                      <a class="collapse-item" href="buttons.html">Buttons</a>
                      <a class="collapse-item" href="admin">Cards</a>
                  </div>
              </div>
          </li>
      
      
      
          <!-- Divider -->
          <hr class="sidebar-divider">
      
      
      
      
          <!-- Nav Item - Charts -->
          <li class="nav-item">
              <a class="nav-link" href="charts.html">
                  <i class="fas fa-fw fa-chart-area"></i>
                  <span>Charts</span></a>
          </li>
      
      
      
      
      
      
      
      </ul>
      <!-- End of Sidebar -->
      
      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
      
          <!-- Main Content -->
          <div id="content">
      
              <!-- Topbar -->
              <nav class="navbar navbar-expand bg-white topbar mb-4 static-top shadow navbar-light bg-light">
      
                  <!-- Sidebar Toggle (Topbar) -->
                  <button id="sidebarToggleTop" class="btn btn-link d-md-none me-3 rounded-circle" @click="sidebarToggleTop">
                      <i class="fa fa-bars"></i>
                  </button>
      
                  <!-- Topbar Search -->
                  <form class="d-none d-sm-inline-block ms-md-3 my-2 my-md-0 mw-100 navbar-search ms-auto d-flex align-items-center d-inline-flex">
                      <div class="input-group">
                          <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                          <div class="input-group-append">
                              <button class="btn btn-primary" type="button">
                                  <i class="fas fa-search fa-sm"></i>
                              </button>
                          </div>
                      </div>
                  </form>
      
                  <!-- Topbar Navbar -->
                  <ul class="navbar-nav me-auto">
      
                      <!-- Nav Item - Search Dropdown (Visible Only XS) -->
                      <li class="nav-item dropdown no-arrow d-sm-none">
                          <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                              <i class="fas fa-search fa-fw"></i>
                          </a>
                          <!-- Dropdown - Messages -->
                          <div class="dropdown-menu dropdown-menu-end p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                              <form class="w-100 navbar-search ms-auto d-flex align-items-center d-inline-flex">
                                  <div class="input-group">
                                      <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
                                      <div class="input-group-append">
                                          <button class="btn btn-primary" type="button">
                                              <i class="fas fa-search fa-sm"></i>
                                          </button>
                                      </div>
                                  </div>
                              </form>
                          </div>
                      </li>
      
                      <!-- Nav Item - Alerts -->
                      <li class="nav-item dropdown no-arrow mx-1">
                          <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                              <i class="fas fa-bell fa-fw"></i>
                              <!-- Counter - Alerts -->
                              <span class="badge text-bg-danger badge-counter">1+</span>
                          </a>
                          <!-- Dropdown - Alerts -->
                          <div class="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="alertsDropdown">
                              <h6 class="dropdown-header">
                                  Alerts Center
                              </h6>
                              <a class="dropdown-item d-flex align-items-center" href="#">
                                  <div class="me-3">
                                      <div class="icon-circle bg-primary">
                                          <i class="fas fa-file-alt text-white"></i>
                                      </div>
                                  </div>
                                  <div>
                                      <div class="small text-gray-500">December 12, 2019</div>
                                      <span class="fw-bold">A new monthly report is ready to download!</span>
                                  </div>
                              </a>
      
                              <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                          </div>
                      </li>
      
                      <!-- Nav Item - Messages -->
                      <li class="nav-item dropdown no-arrow mx-1">
                          <a class="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                              <i class="fas fa-envelope fa-fw"></i>
                              <!-- Counter - Messages -->
                              <span class="badge text-bg-danger badge-counter">1</span>
                          </a>
                          <!-- Dropdown - Messages -->
                          <div class="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="messagesDropdown">
                              <h6 class="dropdown-header">
                                  Message Center
                              </h6>
                              <a class="dropdown-item d-flex align-items-center" href="#">
                                  <div class="dropdown-list-image me-3">
                                      <img class="rounded-circle" src="" alt="...">
                                      <div class="status-indicator bg-success"></div>
                                  </div>
                                  <div class="fw-bold">
                                      <div class="text-truncate">Hi there! I am wondering if you can help me with a
                                          problem I've been having.</div>
                                      <div class="small text-gray-500">Emily Fowler · 58m</div>
                                  </div>
                              </a>
      
                              <a class="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                          </div>
                      </li>
      
                      <div class="topbar-divider d-none d-sm-block"></div>
      
                      <!-- Nav Item - User Information -->
                      <li class="nav-item dropdown no-arrow">
                          <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                              <span class="me-2 d-none d-lg-inline text-gray-600 small">Omar</span>
                              <img class="img-profile rounded-circle" src="">
                          </a>
                          <!-- Dropdown - User Information -->
                          <div class="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
                              <a class="dropdown-item" href="#">
                                  <i class="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                                  Profile
                              </a>
      
      
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                  <i class="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                                  Logout
                              </a>
                          </div>
                      </li>
      
                  </ul>
      
              </nav>
              <!-- End of Topbar -->
      
              <!-- Begin Page Content -->
              <div class="container-fluid">
      
                  <!-- Page Heading -->
                  <div class="d-sm-flex align-items-center justify-content-between mb-4">
                      <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                      <a href="#" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i class="fas fa-download fa-sm text-white-50"></i> button</a>
                  </div>
      
                  <h1>card</h1>
                  <div class="row">
          
          <div class="col-lg-6">
          
              <!-- Default Card Example -->
              <div class="card mb-4">
                  <div class="card-header">
                      Default Card Example
                  </div>
                  <div class="card-body">
                      This card uses Bootstrap's default styling with no utility classes added. Global
                      styles are the only things modifying the look and feel of this default card example.
                  </div>
              </div>
          
              <!-- Basic Card Example -->
              <div class="card shadow mb-4">
                  <div class="card-header py-3">
                      <h6 class="m-0 fw-bold text-primary">Basic Card Example</h6>
                  </div>
                  <div class="card-body">
                      The styling for this basic card example is created by using default Bootstrap
                      utility classes. By using utility classes, the style of the card component can be
                      easily modified with no need for any custom CSS!
                  </div>
              </div>
          
          </div>
          
          <div class="col-lg-6">
          
              <!-- Dropdown Card Example -->
              <div class="card shadow mb-4">
                  <!-- Card Header - Dropdown -->
                  <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 class="m-0 fw-bold text-primary">Dropdown Card Example</h6>
                      <div class="dropdown no-arrow">
                          <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">
                              <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-end shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                              <div class="dropdown-header">Dropdown Header:</div>
                              <a class="dropdown-item" href="#">Action</a>
                              <a class="dropdown-item" href="#">Another action</a>
                              <div class="dropdown-divider"></div>
                              <a class="dropdown-item" href="#">Something else here</a>
                          </div>
                      </div>
                  </div>
                  <!-- Card Body -->
                  <div class="card-body">
                      Dropdown menus can be placed in the card header in order to extend the functionality
                      of a basic card. In this dropdown card example, the Font Awesome vertical ellipsis
                      icon in the card header can be clicked on in order to toggle a dropdown menu.
                  </div>
              </div>
          
              <!-- Collapsable Card Example -->
              <div class="card shadow mb-4">
                  <!-- Card Header - Accordion -->
                  <a href="#collapseCardExample" class="d-block card-header py-3" role="button" aria-expanded="true" aria-controls="collapseCardExample" data-bs-toggle="collapse">
                      <h6 class="m-0 fw-bold text-primary">Collapsable Card Example</h6>
                  </a>
                  <!-- Card Content - Collapse -->
                  <div class="collapse show" id="collapseCardExample">
                      <div class="card-body">
                          This is a collapsable card example using Bootstrap's built in collapse
                          functionality. <strong>Click on the card header</strong> to see the card body
                          collapse and expand!
                      </div>
                  </div>
              </div>
          
          </div>
          
          </div>
      
              </div>
              <!-- /.container-fluid -->
      
          </div>
          <!-- End of Main Content -->
      
          <!-- Footer -->
          <footer class="sticky-footer bg-white">
              <div class="container my-auto">
                  <div class="copyright text-center my-auto">
                      <span>Copyright © </span>
                  </div>
              </div>
          </footer>
          <!-- End of Footer -->c
      
      </div>
      <!-- End of Content Wrapper -->
      
      </div>
   </body>
   </html>

   
 

    </template>