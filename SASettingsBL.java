package enlj.p102accounts.mssqlv51.p10251settleact.sasettings.logics;

import java.sql.*;
import org.w3c.dom.*;
import java.math.BigInteger;

import enlj.projenv.logics.*;
import enlj.webenv.logics.*;
import enlj.projenv.mssql.*;
import enlj.webenv.utils.*;
import enlj.p102accounts.mssqlv51.resource.logics.*;

public class SASettingsBL extends MSELogic
{
	/* Module Id */
    private final String kModuleId = "102510601";
    
    /* Task Ids Range */   
    BigInteger kUserInfoTaskIds_Start  = null;
	BigInteger kUserInfoTaskIds_End	   = null;
	BigInteger kBankInfoTaskIds_Start  = null;
	BigInteger kBankInfoTaskIds_End    = null;		

	public SASettingsBL ()
	{
		super ();
		kUserInfoTaskIds_Start = new BigInteger ("10251060111");
		kUserInfoTaskIds_End = new BigInteger ("10251060130");
		
		kBankInfoTaskIds_Start = new BigInteger ("10251060131");
		kBankInfoTaskIds_End = new BigInteger ("10251060150");		
	}
	
    public String executeTask (Document oDocument, String oTaskId)
    {
    	BigInteger biTaskId = new BigInteger (oTaskId);
		
		String oXMLString = "";
		setParams(oDocument);
		
		if ((biTaskId.compareTo (kUserInfoTaskIds_Start) == 1 || biTaskId.compareTo (kUserInfoTaskIds_Start) == 0) && 
			    (biTaskId.compareTo (kUserInfoTaskIds_End) == -1 || biTaskId.compareTo (kUserInfoTaskIds_End) == 0))
		{
			UserInfoBL oUserInfoBL = new UserInfoBL ();
			oXMLString = oUserInfoBL.executeTask (oDocument, oTaskId);
		}
		
		if ((biTaskId.compareTo (kBankInfoTaskIds_Start) == 1 || biTaskId.compareTo ( kBankInfoTaskIds_Start ) == 0) && 
			    (biTaskId.compareTo (kBankInfoTaskIds_End) == -1 || biTaskId.compareTo (kBankInfoTaskIds_End) == 0))
		{
			BankInfoBL oUserInfoBL = new BankInfoBL ();
			oXMLString = oUserInfoBL.executeTask (oDocument, oTaskId);
		}
		return oXMLString;
    }
    
    public void log (String oMessage)
	{
//		logMessage (oMessage);
	}
}
