
function NewBankModule_102510601ba ()
{
	this.inheritFrom = PEModule;
	this.inheritFrom ();
	
	this.ModuleId   = 102510601;
    this.VersionId  = 1.01;
}

function Constructor_102510601ba ()
{
	UDModule		= new NewBankModule_102510601ba ();
	
	UDModule.PROJ	= new PEProject ();
	UDModule.DOM    = new PEDocument ();
    UDModule.COMP   = new PEComponent ();
    UDModule.VAL	= new PEValidation ();
    UDModule.PROJEX	= new Accounts_10251 ();
}
