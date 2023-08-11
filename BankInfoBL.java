package enlj.p102accounts.mssqlv51.p10251settleact.sasettings.logics;

import java.sql.*;
import java.util.Arrays;
import org.w3c.dom.*;

import enlj.projenv.logics.*;
import enlj.webenv.logics.*;
import enlj.projenv.mssql.*;
import enlj.webenv.utils.*;
import enlj.p102accounts.mssqlv51.resource.logics.*;
import enlj.p101admin.commonsv11.resource.logics.userpm.*;

public class BankInfoBL extends MSELogic
{
	/* Module Id */
    private final String kModuleId  = "102510601";
    
    /* Task Ids */
   	private final String kB_InitData       =  "10251060131";
   	private final String kB_Entity         =  "10251060133";
   	private final String kB_BankList       =  "10251060134";
   	private final String kB_Delete 	   	   =  "10251060135";
   	
    /* Task Ids - New Bank */
   	private final String kBA_InitData      =  "10251060141";
   	private final String kBA_Update 	   =  "10251060144";
   	
  	/* Server Row Names */       
    private final String kSR_B_CompanyUnits	= "sr31";
    private final String kSR_B_EntityType	= "sr32";
    private final String kSR_B_Entity       = "sr33";
    private final String kSR_B_BankList     = "sr34";
    private final String kSR_B_TxnPresent   = "sr35";
    private final String kSR_BA_BankInfo    = "sr44";

    /* Server Row Names */
    private final String kSR_BA_Country	    = "sr42";
    private final String kSR_BA_Currency 	= "sr43";
    
  	/* Client Row Names */
  	private String kCR_B_CompanyUnits      = "cr31";
  	private String kCR_B_EntityType        = "cr32";
  	private String kCR_B_Entity	           = "cr33";  
  	private String kCR_B_BankList          = "cr34";
  	private String kCR_B_Delete			   = "cr35";
  	
  	/* Client Row Names - New Bank */
  	private String  kCR_BA_Country         = "cr42";  
  	private String  kCR_BA_Currencies      = "cr43";
  	private String  kCR_BA_Update		   = "cr44";
  	
  	/* Status Ids */
    private final String GT_BankList        = "51";
    
    private final String T31_FunctionPM     = "3101";	
	private final String T31_CompanyUnits	= "3102";
	private final String T31_EntityType     = "3103";
	
	private final String T33_Entity         = "33";
	
	private final String T35_ProcessDelete  = "3501";
	private final String T35_DelInsert		= "3502";
	private final String T35_Delete			= "3503";
	
	private final String T41_CompanyUnits	= "4101";
	private final String T41_Countries      = "4102";
	private final String T41_Currency		= "4103";
	
	private final String T44_ProcessUpdate  = "4401";
	private final String T44_InsertBank 	= "4402";
	private final String T44_UpdateBank 	= "4403";
	
   /* Drop Down Constants */
   	private final String kCompany = "1";
   	private final String kClient  = "2";
  	private final String kBookie  = "3";
    private final String kEntity  = "0";
   
   	/* EntityType Fields */
	private final int f_BankId	 		   = 0;
	private final int f_CompanyUnitId	   = 1;
	private final int f_EntityTypeId 	   = 2;
	
	/* Bank List Fields */
	private final int  f_LCompanyUnitId    = 0;
	private final int  f_LEntityType       = 1;
	private final int  f_LEntity           = 2;
	private final int  f_LBankListFltr     = 3;
	
	/* BankInfo Fields */
	private final int f_UBankId					= 0;
	private final int f_UCompanyUnitId     		= 1;
	private final int f_UEntityTypeId	   		= 2;
	private final int f_UEntityId				= 3;
	private final int f_UAccName	 	  		= 4;
	private final int f_UBankName			   	= 5;
	private final int f_UBankAdd	  			= 6;
	private final int f_UBeneficiary  			= 7;
	private final int f_UBenfAdd 				= 8;
	private final int f_UCountryId				= 9;
	private final int f_UCurrencyId				= 10;
	private final int f_USwiftCode				= 12;
	private final int f_UAccNo					= 12;
	private final int f_UIBan					= 13;
	private final int f_UInterBank				= 14;
	private final int f_UCorrespdBank			= 15;

	/* Delete BankInfo Fields */
	private final int f_DSABankId 	= 0;
	
	public BankInfoBL ()
	{
		super ();
	}
	
	public String executeTask (Document oDocument, String oTaskId)
	{
		String oXMLString = "";
		setParams (oDocument);
		
		if (oTaskId.equals (kB_InitData))
		{
			oXMLString = getInitData_B ();
		}
		else if(oTaskId.equals(kB_Entity))
		{
			oXMLString = getEntity_B ();
		}
		else if(oTaskId.equals(kB_BankList))
		{
			oXMLString = getBankList_B ();
		}
		else if (oTaskId.equals(kB_Delete))
		{
			oXMLString = DeleteBankInfo_B ();
		}
		else if(oTaskId.equals(kBA_InitData))
		{
			oXMLString = getInitData_BA ();
		}
		else if(oTaskId.equals(kBA_Update))
		{
			oXMLString = processUpdate_BA ();
		}
		
		return oXMLString;
	}
	
	private String getInitData_B()
	{
		StringBuffer oBuffer =  new StringBuffer ();
		
		oBuffer.append(getFunctionPM(getUserId (),kModuleId,T31_FunctionPM));
		oBuffer.append (AccountingUtil.getCompanyUnits (this, T31_CompanyUnits, kSR_B_CompanyUnits, ConstantsUtil.kFE_ChooseOne));
		oBuffer.append (getEntityType_B ());
		
		return oBuffer.toString();
	}
	
	private String getEntityType_B ()
	{
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		ResultSet oResultSet = null;
		
		StringBuffer oBuffer = new StringBuffer ();
        
		try
	    {			        
			String oSQL =
				" Select en_0251z00_entity_sa.entitytypeid As id, " +
						" en_0251z00_entity_sa.entity_" + getLanguage () + " As entitytype_" + getLanguage () + ", " +  
						" 1 As orderid " +  
					" From en_0251z00_entity_sa " +
					" Union All " +  
					" Select 0 As id, " +
						" en_0251z00_firstelement.name_" + getLanguage () + " As entitytype_" + getLanguage () + ", " +
						" 0 As orderid " +
					" From en_0251z00_firstelement " +
					" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_ChooseOne +
					" Order By orderid, id ";
				
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
				
				if (oResultSet != null)    
				{
					oBuffer.append (toXMLString (oResultSet, kSR_B_EntityType));
					oBuffer.append (getStatusXML (T31_EntityType, 1, "BankInfoBL:getEntityType_B:Successfull"));				
				}
				else
					oBuffer.append (getStatusXML (T31_EntityType, -1, "BankInfoBL:getEntityType_B:UnSuccessfull"));
	        }
	        catch (Exception oException)
	        {
	            oBuffer.append (getStatusXML (T31_EntityType, -1, "BankInfoBL:getEntityType_B:" + oException.toString ()));
	            logMessage(oBuffer.toString ());			
	        }
	        
	        finally
	        {
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }

	        return oBuffer.toString ();
		}
	
		private String getEntity_B ()
		{
			StringBuffer oBuffer = new StringBuffer ();
        
			String [] arrInfo = getParams (kCR_B_Entity);
			String oEntityTypeId = arrInfo [f_EntityTypeId];
			
			if(oEntityTypeId.equals(kClient) == true)
			{
				oBuffer.append (getClientInfo_B (arrInfo));
			}
			if (oEntityTypeId.equals (kBookie) == true)
			{
				oBuffer.append (getBookieInfo_B (arrInfo));
			}
			
			return oBuffer.toString ();
		}
		
		private String getBookieInfo_B (String[] arrInfo)
		{	
			DBConnector10251 oConnector = new DBConnector10251 ();        
			Statement oStatement = null;
			ResultSet oResultSet = null;
		
			StringBuffer oBuffer = new StringBuffer ();
		
			int nCompanyUnitId = convertToInt (arrInfo [f_CompanyUnitId]);
			String oBankId = arrInfo[f_BankId];
			
			String oSQL = "";
			
			try
			{		
				if (oBankId.equals("") == false)
					oSQL = getBookiesAll_SQL (arrInfo);
				else
					oSQL = getBookiesWithBank_SQL (arrInfo);
					
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
				
				if (oResultSet != null)    
				{
					oBuffer.append (toXMLString (oResultSet, kSR_B_Entity));
					oBuffer.append (getStatusXML (T33_Entity, 1, "BankInfoBL:getBookieInfo_B:Successfull"));				
				}
				else
					oBuffer.append (getStatusXML (T33_Entity, -1, "BankInfoBL:getBookieInfo_B:UnSuccessfull"));
	        }
	        catch (Exception oException)
	        {
	            oBuffer.append (getStatusXML (T33_Entity, -1, "BankInfoBL:getBookieInfo_B:" + oException.toString ()));
	            logMessage(oBuffer.toString ());			
	        }
	        
	        finally
	        {
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }

	        return oBuffer.toString ();
	    }
		
		private String getClientInfo_B (String[] arrInfo)
		{	
			DBConnector10251 oConnector = new DBConnector10251 ();        
			Statement oStatement = null;
			ResultSet oResultSet = null;
		
			StringBuffer oBuffer = new StringBuffer ();
		
			int nCompanyUnitId = convertToInt (arrInfo [f_CompanyUnitId]);
			String oBankId = arrInfo[f_BankId];
			
			String oSQL = "";
			
			try
			{	
				if (oBankId.equals("") == false)
					oSQL = getClientAll_SQL (nCompanyUnitId);
				else
					oSQL = getClientWithBank_SQL (nCompanyUnitId);
			
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
			
				if (oResultSet != null)    
				{
					oBuffer.append (toXMLString (oResultSet, kSR_B_Entity));
					oBuffer.append (getStatusXML (T33_Entity, 1, "BankInfoBL:getClientInfo_B:Successfull"));				
				}
				else
					oBuffer.append (getStatusXML (T33_Entity, -1, "BankInfoBL:getClientInfo_B:UnSuccessfull"));
	        }
	        catch (Exception oException)
	        {
	            oBuffer.append (getStatusXML (T33_Entity, -1, "BankInfoBL:getClientInfo_B:" + oException.toString ()));
	            logMessage(oBuffer.toString ());			
	        }
	        
	        finally
	        {
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }

	        return oBuffer.toString ();
	    }
		
		private String getClientAll_SQL (int nCompanyUnitId)
		{
			String SQL = 
				" Select  en_0251b02_clientinfo.clientid As id, " +
					" en_0251b02_clientinfo.clientname, " +  
					" 1 As orderid " +  
				" From en_0251b02_clientinfo " +
				" Union All " +  
				" Select 0 As id, " +
					" en_0251z00_firstelement.name_" + getLanguage () + " As clientname, " +
					" 0 As orderid " +
				" From en_0251z00_firstelement " +
				" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_All +
				" Order By orderid, clientname ";
					
			return SQL;
		}
		
		private String getClientWithBank_SQL (int nCompanyUnitId)
		{
			String SQL = 
				" Select  en_0251d03_bankinfo_sa.entityid As id, " +
					" en_0251b02_clientinfo.clientname, " +  
					" 1 As orderid " +  
				" From en_0251b02_clientinfo, en_0251d03_bankinfo_sa " +
				" Where en_0251b02_clientinfo.clientid = en_0251d03_bankinfo_sa.entityid And " +
					" en_0251b02_clientinfo.unitid =" + nCompanyUnitId + " And " +
					" en_0251d03_bankinfo_sa.entitytypeid = " + kClient + 
				" Union All " +  
				" Select 0 As id, " +
					" en_0251z00_firstelement.name_" + getLanguage () + " As clientname " + ", " +
					" 0 As orderid " +
				" From en_0251z00_firstelement " +
				" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_All +
				" Order By orderid, clientname ";
					
			return SQL;
		}
		
		private String getBookiesAll_SQL (String [] arrInfo)
		{
			String oSQL =
				" Select Distinct en_0251b01_bookieinfo.bookieid As id, " +
					" en_0251b01_bookieinfo.bookiename As bookiename, " +
					" 1 As orderid " +
				" From en_0251b01_bookieinfo " +
				" Where en_0251b01_bookieinfo.unitid = " + arrInfo [f_CompanyUnitId] + " And " +
					" en_0251b01_bookieinfo.isactive = 1 " +
				" Union All " + 
				" Select 0 As id, " +
					" en_0251z00_firstelement.name_" + getLanguage () + " As bookiename_" + getLanguage () + ", " +
					" 0 As orderid " +
				" From en_0251z00_firstelement " +
				" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_All +				
				" Order By orderid, bookiename ";
			
			return oSQL;
		}
		
		private String getBookiesWithBank_SQL (String [] arrInfo)
		{
			String oSQL =
    			" Select Distinct en_0251d03_bankinfo_sa.entityid As id, " +
    					" en_0251b01_bookieinfo.bookiename As bookiename, " +
    					" 1 As orderid " +
    			" From en_0251b01_bookieinfo, en_0251d03_bankinfo_sa " +
    			" Where en_0251d03_bankinfo_sa.unitid = " + arrInfo [f_CompanyUnitId] + " And " +
    					" en_0251b01_bookieinfo.bookieid = en_0251d03_bankinfo_sa.entityid And " +
    					" en_0251d03_bankinfo_sa.entitytypeid = " + kBookie +
    			" Union All " + 
    			" Select 0 As id, " +
    					" en_0251z00_firstelement.name_" + getLanguage () + " As bookiename_" + getLanguage () + ", " +
    					" 0 As orderid " +
    			" From en_0251z00_firstelement " +
    			" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_All +				
    			" Order By orderid, bookiename ";
				
			return oSQL;
		}
		
		private String getBankList_B ()
		{
			DBConnector10251 oConnector = new DBConnector10251 ();        
			Statement oStatement = null;
			ResultSet oResultSet = null;
			
			StringBuffer oBuffer = new StringBuffer ();
			
			String [] arrInfo     	= getParams (kCR_B_BankList);
			int nCompanyUnitId    	= convertToInt(arrInfo [f_LCompanyUnitId]);
			String oEntityTypeId    = arrInfo[f_LEntityType];
			String oEntitiesId      = arrInfo[f_LEntity];
			String oEntityNameFltr  = arrInfo[f_LBankListFltr]; 
			
			String oSelectCondition	= "";
			String oFromCondition	= "";
			String oCondition 		= "";
			
			if (oEntityTypeId.equals (kCompany) == true)
			{
				oSelectCondition += " en_0151a02_companyunit.unitname As entityname, ";
				oFromCondition += ", en_0151a02_companyunit ";
				oCondition += " And en_0251d03_bankinfo_sa.entityid = en_0151a02_companyunit.unitid ";
			}
			else if (oEntityTypeId.equals (kClient) == true)
			{
				oSelectCondition += " en_0251b02_clientinfo.clientname As entityname, ";
				oFromCondition += ", en_0251b02_clientinfo ";
				oCondition += " And en_0251d03_bankinfo_sa.entityid = en_0251b02_clientinfo.clientid ";
			}
			else if (oEntityTypeId.equals (kBookie) == true)
			{
				oSelectCondition += " en_0251b01_bookieinfo.bookiename As entityname, ";
				oFromCondition += ", en_0251b01_bookieinfo ";
				oCondition += " And en_0251d03_bankinfo_sa.entityid = en_0251b01_bookieinfo.bookieid ";
			}
			if (oEntitiesId.equals (kEntity) == false)
			{
				oCondition += " And en_0251d03_bankinfo_sa.entityid = " + convertToInt (arrInfo [f_LEntity]);
			}
			if (oEntityNameFltr.equals ("blank") == false)
			{
				if (oEntityTypeId.equals (kCompany) == true)
					oCondition += " And en_0251d03_bankinfo_sa.bankname Like '%" + oEntityNameFltr + "%' ";
				else if (oEntityTypeId.equals (kClient) == true)
					oCondition += " And en_0251b02_clientinfo.clientname Like '%" + oEntityNameFltr + "%' ";
				else if (oEntityTypeId.equals (kBookie) == true)
					oCondition += " And en_0251b01_bookieinfo.bookiename Like '%" + oEntityNameFltr + "%' ";
			}
			
			try
			{
				String oSQL = 
					" Select en_0251d03_bankinfo_sa.bankid As id," +
						" en_0251d03_bankinfo_sa.entityid, " +
						 oSelectCondition +
					    " en_0251d03_bankinfo_sa.accountname, " +
					    " en_0251d03_bankinfo_sa.accountnumber, " +
					    " en_0251d03_bankinfo_sa.bankname, " +
					    " en_0251d03_bankinfo_sa.beneficiaryname, " +
					    " en_0251d03_bankinfo_sa.bankaddress, " +
					    " en_0151z00_country.countryid, " +
						" en_0151z00_country.countryname_" + getLanguage () + " As countryname_" + getLanguage () + ", " +
					    " en_0151z00_currency.currencyid, " +
					    " en_0151z00_currency.currencycode_" + getLanguage () + " As currencycode_" + getLanguage () + ", " +
					    " en_0251d03_bankinfo_sa.swiftcode, " +
					    " en_0251d03_bankinfo_sa.iban, " +
					    " en_0251d03_bankinfo_sa.intermediatebank, " +
					    " en_0251d03_bankinfo_sa.correspondencebank, " +
					    " createdby.username As createdby, " +
					    " Convert (varchar, en_0251d03_bankinfo_sa.createddate, 103) As createddate, " +
					    " Convert (varchar (5), en_0251d03_bankinfo_sa.createddate, 108) As createdtime,  " +
					    " modifiedby.username As modifieddby, " +
					    " Convert (varchar, en_0251d03_bankinfo_sa.modifieddate, 103) As modifieddate, " +
					    " Convert (varchar (5), en_0251d03_bankinfo_sa.modifieddate, 108) As modifiedtime, " +
					    " en_0251d03_bankinfo_sa.beneficiaryaddress " +
					" From en_0251d03_bankinfo_sa, en_0151a04_userinfo As createdby, " +
						" en_0151a04_userinfo As modifiedby WITH (NOLOCK), en_0151z00_country, en_0151z00_currency " +
						 oFromCondition +
					" Where en_0251d03_bankinfo_sa.countryid = en_0151z00_country.countryid And " +
						" en_0251d03_bankinfo_sa.currencyid = en_0151z00_currency.currencyid And " +
						" en_0251d03_bankinfo_sa.unitid = " + nCompanyUnitId + " And " +
						" en_0251d03_bankinfo_sa.entitytypeid = " + convertToInt (arrInfo[f_LEntityType]) + " And " +
						" en_0251d03_bankinfo_sa.createdby = createdby.userid And " +
						" en_0251d03_bankinfo_sa.modifiedby = modifiedby.userid " +
						 oCondition +	
					" Order by entityname";
					
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
					
				if(oResultSet!=null)
				{
					oBuffer.append (toXMLString (oResultSet, kSR_B_BankList));
					oBuffer.append (getStatusXML (GT_BankList, 1, "BankInfoBL:getBankList_B:Successfull"));	
				}
				else
					oBuffer.append (getStatusXML (GT_BankList, -1, "BankInfoBL:getBankList_B:UnSuccessfull"));
			} 
			catch (Exception oException) 
			{
				oBuffer.append (getStatusXML (GT_BankList, -1, "BankInfoBL:getBankList_B" + oException.toString ()));
	            logMessage(oBuffer.toString ());
			}
			
			finally
			{
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
			}
			
			return oBuffer.toString();
		}
		
		private String DeleteBankInfo_B ()
		{
			StringBuffer oBuffer = new StringBuffer ();
			
			String [] arrInfo = getParams (kCR_B_Delete);
			int nSABankId	= convertToInt (arrInfo [f_DSABankId]);
	
			if (isTxnPresent (nSABankId) == false)
			{
				oBuffer.append (DataUtil.getRowXML (kSR_B_TxnPresent, "0"));				
				oBuffer.append (processDelete_B (nSABankId));
			}
			else
				oBuffer.append (DataUtil.getRowXML (kSR_B_TxnPresent, "1"));
			
			return oBuffer.toString ();	
		}
		
		private boolean isTxnPresent (int nBankId)
	    {
			 DBConnector10251 oConnector = new DBConnector10251 ();
			 Statement oStatement = null;
			 ResultSet oResultSet = null;
			
			boolean bPresent = false;        
			try
			{
			    String oSQL =
	                " Select Count (*) As recordcount " +
	                " From en_0251d04_txninfo_sa " +
					" Where en_0251d04_txninfo_sa.bankid = " + nBankId;
	       
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
				
				if (oResultSet != null && oResultSet.next ())
					bPresent = (oResultSet.getInt ("recordcount") > 0);
			}
	        catch (Exception oException)
	        {
	            logMessage("BankInfoBL:isTxnPresentForBank:" + oException.toString ());
	        }
	        
	        finally
	        {
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }		
			
			return bPresent;
	    }
		
		private String processDelete_B (int nBankId)
		{
			DBConnector10251 oConnector = new DBConnector10251 ();        
			Statement oStatement = null;
			
			StringBuffer oBuffer = new StringBuffer ();
			
			try
			{
				String oSQL =
					" Insert Into en_0251d03_bankinfo_sa_del " +
	    			" ( " +
						" bankid, entityid, entitytypeid, " +
						" unitid, accountname, accountnumber, " +
						" bankname, beneficiaryname, beneficiaryaddress, bankaddress, " +
						" countryid, currencyid, " +
						" swiftcode, iban, " +
						" intermediatebank, correspondencebank, " +
						" createdby, createddate, " +
						" modifiedby, modifieddate, " +
						" deletedby, deleteddate " +
					" ) " +
	        		" Select " +	
					 	" bankid, entityid, entitytypeid, " +
						" unitid, accountname, accountnumber, " +
						" bankname, beneficiaryname, beneficiaryaddress, bankaddress, " +
						" countryid, currencyid, " +
						" swiftcode, iban, " +
						" intermediatebank, correspondencebank, " +
						" createdby, createddate, " +
						" modifiedby, modifieddate, " +
						" " + getUserId () + ", " + AccountingUtil.getDateString () +		
	        		" From en_0251d03_bankinfo_sa " +  
	        		" Where en_0251d03_bankinfo_sa.bankid = " + nBankId;    

	            oStatement    = oConnector.getStatement ();
				int nStatusId = oConnector.executeUpdate (oSQL,oStatement);
				
				logMessage("nStatusId is:"+nStatusId);
				
				if (nStatusId >= 1)
	            {
	            	oSQL = " Delete From en_0251d03_bankinfo_sa Where bankid = " + nBankId;;
	            	
	            	nStatusId = oConnector.executeUpdate (oSQL, oStatement); 
	                if (nStatusId >= 0)
	                {
	                	oBuffer.append (getStatusXML (T35_Delete, 1, "BankInfoBL:deleteBankInfo_B:Successfull"));
	                	oBuffer.append (getBankList_B ());
	                }
	                else
	                    oBuffer.append (getStatusXML (T35_Delete, -1, "BankInfoBL:deleteBank_B:UnSuccessfull"));
	            }
	            else
	                oBuffer.append (getStatusXML (T35_DelInsert, -1, "BankInfoBL:delInsertBank_B:UnSuccessfull" ));
				
			}
			catch (Exception oException)
			{
				oBuffer.append (getStatusXML (T35_ProcessDelete, -1, "BankInfoBL:processDelete_B:" + oException.toString ()));
	            logMessage(oBuffer.toString ());
			}
			
			finally
	        {
				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }
	        
	        return oBuffer.toString ();
		}
		
		private String getCountry_BA ()
		{
			DBConnector10251 oConnector = new DBConnector10251 ();        
			Statement oStatement = null;
			ResultSet oResultSet = null;
			
			StringBuffer oBuffer = new StringBuffer ();
			
			try
			{
				String oSQL =
					" Select en_0151z00_country.countryid As id, " +
						" en_0151z00_country.countryname_" + getLanguage () + " As countryname_" + getLanguage () + ", " +  
						" 1 As orderid " +  
					" From en_0151z00_country " +
					" Union All " +  
					" Select 0 As id, " +
						" en_0251z00_firstelement.name_" + getLanguage () + " As countryname_" + getLanguage () + ", " +
						" 0 As orderid " +
					" From en_0251z00_firstelement " +
					" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_ChooseOne +
					" Order By orderid, countryname_" + getLanguage () + " ";
				
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
				
				if(oResultSet!=null)
				{
					oBuffer.append (toXMLString (oResultSet, kSR_BA_Country));
					oBuffer.append (getStatusXML (T41_Countries, 1, "BankInfoBL:getCountries_BA:Successfull"));	
				}
				else
					oBuffer.append (getStatusXML (T41_Countries, -1, "BankInfoBL:getCountries_BA:UnSuccessfull"));
			}
			catch (Exception oException)
			{
				oBuffer.append (getStatusXML (T41_Countries, -1, "BankInfoBL:getCountries_BA" + oException.toString ()));
	            logMessage(oBuffer.toString ());
			}
			
			finally
			{
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
			}
			
			return oBuffer.toString();
		}
		
		private String getCurrency_BA ()
		{
			DBConnector10251 oConnector = new DBConnector10251 ();        
			Statement oStatement = null;
			ResultSet oResultSet = null;
			
			StringBuffer oBuffer = new StringBuffer ();
			
			try
			{
				String oSQL =
						" Select en_0151z00_currency.currencyid As id, " +
							" en_0151z00_currency.currencycode_" + getLanguage () + " As currencycode_" + getLanguage () + ", " +  
							" 1 As orderid " +  
						" From en_0151z00_currency " +
						" Union All " +  
						" Select 0 As id, " +
							" en_0251z00_firstelement.name_" + getLanguage () + " As currencycode_" + getLanguage () + ", " +
							" 0 As orderid " +
						" From en_0251z00_firstelement " +
						" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_ChooseOne +
						" Order By orderid, currencycode_" + getLanguage () + " ";
				
				oStatement = oConnector.getStatement ();
				oResultSet = oConnector.executeQuery (oSQL, oStatement);
				
				if(oResultSet!=null)
				{
					oBuffer.append (toXMLString (oResultSet, kSR_BA_Currency));
					oBuffer.append (getStatusXML (T41_Currency, 1, "BankInfoBL:getCurrency_BA:Successfull"));	
				}
				else
					oBuffer.append (getStatusXML (T41_Currency, -1, "BankInfoBL:getCurrency_BA:UnSuccessfull"));
			}
			catch (Exception oException)
			{
				oBuffer.append (getStatusXML (T41_Currency, -1, "BankInfoBL:getCurrency_BA" + oException.toString ()));
	            logMessage(oBuffer.toString ());
			}
			
			finally
			{
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;

				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
			}
			
			return oBuffer.toString();
		}
		
		private String getInitData_BA ()
		{
			StringBuffer oBuffer = new StringBuffer ();
			
			oBuffer.append(getFunctionPM(getUserId (),kModuleId,T31_FunctionPM));
			oBuffer.append(getEntity_B ());
			oBuffer.append(getCountry_BA ());
			oBuffer.append(getCurrency_BA ());
			
			return oBuffer.toString();
		}
		
		private String processUpdate_BA ()
		{
			StringBuffer oBuffer = new StringBuffer ();
			try
			{
	            String [] arrInfo = getParams (kCR_BA_Update);
	            int nSABankId	= convertToInt (arrInfo [f_UBankId]);
		
				if (nSABankId == 0)
					oBuffer.append (InsertBankInfo_BA (arrInfo));
				else if (nSABankId > 0)
					oBuffer.append (updateBankInfo_BA (arrInfo));
	        }
		    catch (Exception oException)
		    {
		        oBuffer.append (getStatusXML (T44_ProcessUpdate, -1, "BankInfoBL:processUpdate_BA" + oException.toString ()));
		        logMessage(oBuffer.toString ());           
		    }
			
			return oBuffer.toString ();
        }
		
		private String InsertBankInfo_BA (String [] arrInfo)
		{	
			DBConnector10251 oConnector = new DBConnector10251 ();        
		
			Statement oStatement = null;
			ResultSet oResultSet = null;
		
			StringBuffer oBuffer = new StringBuffer ();
			
			int nEntityId = convertToInt(arrInfo [f_UEntityId]);
			
			try
			{
				String oSQL =	
					" Insert Into en_0251d03_bankinfo_sa " +
					" ( " +
						" entityid, entitytypeid, unitid, " +
						" accountname, accountnumber, bankname, " +
						" beneficiaryname, beneficiaryaddress, bankaddress, " +
						" countryid, currencyid, " +
						" swiftcode, iban, " +
						" intermediatebank, correspondencebank, " +
						" createdby, createddate, " +
						" modifiedby, modifieddate " +
					" ) " +
					" Values " +
					" ( " +
						" " + nEntityId + ", " + arrInfo [f_UEntityTypeId] + ", " + arrInfo [f_UCompanyUnitId] + ", '" +
						" " + arrInfo [f_UAccName] + "', '" + arrInfo [f_UAccNo] + "', '" + arrInfo [f_UBankName] + "', '" +
						" " + arrInfo [f_UBeneficiary] + "', '" + arrInfo [f_UBenfAdd] + "', '" + arrInfo [f_UBankAdd] + "', " +
						" " + arrInfo [f_UCountryId] + ", " + arrInfo [f_UCurrencyId] + ", '" +
						" " + arrInfo [f_USwiftCode] + "', '" + arrInfo [f_UIBan] + "', '" +
						" " + arrInfo [f_UInterBank] + "', '" + arrInfo [f_UCorrespdBank] + "', " +
						" " + getUserId () + ", " + AccountingUtil.getDateString () + ", " +
						" " + getUserId () + ", " + AccountingUtil.getDateString () +
					" ) ";
				oStatement = oConnector.getStatement ();
		
				int nStatusId = oConnector.executeUpdate (oSQL, oStatement);
								
				if (nStatusId >= 0) 
					oBuffer.append (getStatusXML (T44_InsertBank, 1, "BankInfoBL:insertBankInfo_BA:Successfull"));
				else
	                oBuffer.append (getStatusXML (T44_InsertBank, -1, "BankInfoBL:insertBankInfo_BA:UnSuccessfull"));
	        }
	        catch (Exception oException)
	        {
	            oBuffer.append (getStatusXML (T44_InsertBank, -1, "BankInfoBL:InsertBankInfo_BA:" + oException.toString ()));
	            logMessage(oBuffer.toString ());			
	        }
	        
	        finally
	        {
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;
	
				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }
	
			return oBuffer.toString ();
		}
		
		private String updateBankInfo_BA (String[] arrInfo)
		{
			DBConnector10251 oConnector = new DBConnector10251 ();        
	
			Statement oStatement = null;
			ResultSet oResultSet = null;
			
		   StringBuffer oBuffer = new StringBuffer ();
			try
			{
				String oSQL = 
					" Update en_0251d03_bankinfo_sa " +
					" Set accountname = '" + arrInfo [f_UAccName] + "', " +					
						" accountnumber	= '" + arrInfo [f_UAccNo] + "', " +	
						" bankname = '" + arrInfo [f_UBankName] + "', " +	
						" beneficiaryname = '" + arrInfo [f_UBeneficiary] + "', " +
						" beneficiaryaddress = '" + arrInfo [f_UBenfAdd] + "', " +	
						" bankaddress = '" + arrInfo [f_UBankAdd] + "', " +	
						" countryid	= " + arrInfo [f_UCountryId] + ", " +	
						" currencyid = " + arrInfo [f_UCurrencyId] + ", " +	
						" swiftcode	= '" + arrInfo [f_USwiftCode] + "', " +	
						" iban = '" + arrInfo [f_UIBan] + "', " +	
						" intermediatebank = '" + arrInfo [f_UInterBank] + "', " +
						" correspondencebank = '" + arrInfo [f_UCorrespdBank] + "', " +
						" modifiedby = " + getUserId () + ", " +
						" modifieddate = " + AccountingUtil.getDateString () + " " +
					" Where en_0251d03_bankinfo_sa.bankid = " + arrInfo [f_UBankId];	

				oStatement = oConnector.getStatement ();			
	            int nStatusId = oConnector.executeUpdate (oSQL, oStatement);
	            
	            if (nStatusId >= 0)
	                oBuffer.append (getStatusXML (T44_UpdateBank, 1, "BankInfoBL:updateBankInfo_BA:Successfull"));            
	            else
	                oBuffer.append (getStatusXML (T44_UpdateBank, -1, "BankInfoBL:updateBankInfo_BA:UnSuccessfull"));  
			}
	        catch (Exception oException)
	        {
	            oBuffer.append (getStatusXML (T44_UpdateBank, -1, "BankInfoBL:UpdateBankInfo_BA:" + oException.toString ()));
	            logMessage(oBuffer.toString ());			
	        }
	        
	        finally
	        {
				try {oResultSet.close ();} catch (Exception oException) {oException.toString ();}
				oResultSet = null;
	
				try {oStatement.close ();} catch (Exception oException) {oException.toString ();}
				oStatement = null;
				
				oConnector.close ();
				oConnector = null;
	        }
	
			return oBuffer.toString ();
		}
		
}