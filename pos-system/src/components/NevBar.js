
const NevBar = () => {

    return (
        <>
          <nav class="navbar navbar-expand-lg bg-secondary-subtle">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Home
          </a>       
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul class="navbar-nav">

            </ul>
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="/">
                Home
              </a>
              <a class="nav-link" href="category">
                Category
              </a>
              <a class="nav-link" href="/item">
                Items
              </a>  
            </div>
          </div>
        </div>
        <div class="justify p-3">
              <a class="nav-link" href="/login">Login</a>
              </div>
      </nav>
        
        </>
    )
}

export default NevBar;