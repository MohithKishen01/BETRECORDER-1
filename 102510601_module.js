function SASettingsModule_102510601 ()
{
	this.inheritFrom = PEModule;
	this.inheritFrom ();
	
	this.ModuleId   = 102510601;
    this.VersionId  = 1.01;
}

function Constructor_102510601 ()
{
	UDModule	= new SASettingsModule_102510601 ();
	
	UDModule.PROJ	= new PEProject ();
	
    UDModule.PROJEX	= new Accounts_10251 ();
}
