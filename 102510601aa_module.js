function NewUserModule_102510601aa ()
{
	this.inheritFrom = PEModule;
	this.inheritFrom ();
	
	this.ModuleId   = 102510601;
    this.VersionId  = 1.01;
}

function Constructor_102510601aa ()
{
	UDModule	= new NewUserModule_102510601aa ();
	
	UDModule.PROJ	= new PEProject ();
	UDModule.DOM    = new PEDocument ();
	UDModule.COMP   = new PEComponent ();
	UDModule.VAL	= new PEValidation ();    
    UDModule.PROJEX	= new Accounts_10251 ();
}