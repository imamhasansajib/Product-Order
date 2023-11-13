function LayoutComponet()
{
    return (
        <nav id="sidebar">
				<div class="custom-menu">
					<button type="button" id="sidebarCollapse" class="btn btn-primary">
	          <i class="fa fa-bars"></i>
	          <span class="sr-only">Toggle Menu</span>
	        </button>
        </div>
	  		<h1><a href="#" class="logo">Order Product</a></h1>
        <ul class="list-unstyled components mb-5">
          <li class="active">
            <a href="#"><span class="fa fa-user mr-3"></span>Users</a>
          </li>
        </ul>

    	</nav>
    );
}

export default LayoutComponet;