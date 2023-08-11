function BankInfoModule_102510601b ()
{
	this.inheritFrom = PEModule;
	this.inheritFrom ();
	
	this.ModuleId = 102510601;
	this.VersionId= 1.01;
}

function Constructor_102510601b ()
{
	UDModule = new BankInfoModule_102510601b (); 
	
	UDModule.PROJ    = 	new PEProject ();
	UDModule.DOM     = 	new PEDocument ();
	UDModule.COMP    = 	new PEComponent ();
	UDModule.TBL     = 	new PETable ();
	UDModule.VAL     = 	new PEValidation ();
	UDModule.MSG     = 	new PEMessages ();
	UDModule.PROJEX  = 	new Accounts_10251 ();
}