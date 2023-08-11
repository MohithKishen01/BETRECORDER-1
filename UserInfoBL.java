package enlj.p102accounts.mssqlv51.p10251settleact.sasettings.logics;

import java.sql.*;
import org.w3c.dom.*;

import enlj.projenv.logics.*;
import enlj.webenv.logics.*;
import enlj.projenv.mssql.*;
import enlj.webenv.utils.*;
import enlj.p102accounts.mssqlv51.resource.logics.*;
import enlj.p101admin.commonsv11.resource.logics.userpm.*;

public class UserInfoBL extends MSELogic
{
	/* Module Id */
    private final String kModuleId = "102510601";
    
    /* Task Ids */
	private final String kA_InitData	= "10251060111";
	private final String kA_UserList	= "10251060114";
	private final String kA_Delete		= "10251060115";
	
	/* Task Ids - New User */
	private final String kAA_InitData 	= "10251060121";
	private final String kAA_UserInfo	= "10251060122";
	private final String kAA_Update		= "10251060123";
	
	/* Server Row Names */       
    private final String kSR_A_CompanyUnits	= "sr11";
    private final String kSR_A_Departments	= "sr12";
    private final String kSR_A_UserList		= "sr13";
    private final String kSR_A_TxnPresent	= "sr14";
    
    private final String kSR_AA_Departments	= "sr21";
    private final String kSR_AA_UserGroups	= "sr22";
    private final String kSR_AA_UserInfo	= "sr23";
    
    /* Client Row Names */ 
    private final String kCR_A_UserList	= "cr11";
    private final String kCR_A_Delete	= "cr12";
    
    private final String kCR_AA_UserInfo= "cr21";
    private final String kCR_AA_Update	= "cr22";
    
	/* Status Ids */
    private final String GT_Departments		= "51";
    private final String GT_UserList		= "52";
    
	private final String T11_FunctionPM     = "1101";	
	private final String T11_CompanyUnits	= "1102";
	
	private final String T15_ProcessDelete	= "1501";
	private final String T15_DelInsert		= "1502";
	private final String T15_Delete			= "1503";
	
	private final String T21_FunctionPM		= "2101";
	private final String T21_UserGroups		= "2102";
	
	private final String T22_UserInfo		= "2201";
	
	private final String T23_ProcessUpdate	= "2301";
	private final String T23_InsertUser		= "2302";
	private final String T23_UpdateUser		= "2303";
	
	/* User List Fields */ 
	private final int f_LCompanyUnitId	= 0;
	private final int f_LDepartmentId	= 1;
	private final int f_LUserNameFltr	= 2;
	
	/* User Info Fields */
	private final int f_UICompanyUnitId	= 0;
	private final int f_UIUserGroupId	= 1;
	
	/* Update User Fields */
	private final int f_UCompanyUnitId	= 0;
	private final int f_USAUserId		= 1;
	private final int f_UDepartmentId	= 2;
	private final int f_UUserGroupId	= 3;
	private final int f_UUserId			= 4;
	private final int f_UEmail 			= 5;
	private final int f_UPassword		= 6;
	private final int f_UEmailCC 		= 7;
	
	/* Delete User Field */
	private final int f_DSAUserId	= 0;
	private final int f_DUserId		= 1;
	
	public UserInfoBL ()
	{
		super ();
	}
	
	public String executeTask (Document oDocument, String oTaskId)
	{
		String oXMLString = "";
		setParams (oDocument);
	
		if (oTaskId.equals (kA_InitData))
		{
			oXMLString = getInitData_A ();
		}
		else if (oTaskId.equals (kA_UserList))
		{
			oXMLString = getUserList_A ();
		}
		else if (oTaskId.equals (kA_Delete))
		{
			oXMLString = deleteUserInfo_A ();
		}
		else if (oTaskId.equals (kAA_InitData))
		{
			oXMLString = getInitData_AA ();
		}
		else if (oTaskId.equals (kAA_UserInfo))
		{
			oXMLString = getUserInfo_AA ();
		}
		else if (oTaskId.equals (kAA_Update))
		{
			oXMLString = processUpdate_AA ();
		}
		
		return oXMLString;
	}
	
	private String getInitData_A ()
    {
        StringBuffer oBuffer = new StringBuffer ();       
        
        oBuffer.append (getFunctionPM (getUserId (), kModuleId, T11_FunctionPM));
        oBuffer.append (AccountingUtil.getCompanyUnits (this, T11_CompanyUnits, kSR_A_CompanyUnits, ConstantsUtil.kFE_ChooseOne));
        oBuffer.append (getDepartments_A (kSR_A_Departments, ConstantsUtil.kFE_All));
        
        return oBuffer.toString ();
    }
	
	private String getDepartments_A (String oServerRow, int nFirstElement)
    {
        DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		ResultSet oResultSet = null;
		
		StringBuffer oBuffer = new StringBuffer ();
        
        try
        {			        
            String oSQL =
				" Select Distinct en_0251z00_department_sa.departmentid As id, " +
					" en_0251z00_department_sa.department_" + getLanguage () + " As department_" + getLanguage () + ", " +  
					" 1 As orderid " +  
				" From en_0251z00_department_sa " +
				" Union All " +  
				" Select 0 As id, " +
					" en_0251z00_firstelement.name_" + getLanguage () + " As department_" + getLanguage () + ", " +
					" 0 As orderid " +
				" From en_0251z00_firstelement " +
				" Where en_0251z00_firstelement.id = " + nFirstElement +
				" Order By orderid, departmentid ";

			oStatement = oConnector.getStatement ();			
			oResultSet = oConnector.executeQuery (oSQL, oStatement);
			
			if (oResultSet != null)    
			{
				oBuffer.append (toXMLString (oResultSet, oServerRow));
				oBuffer.append (getStatusXML (GT_Departments, 1, "UserInfoBL:getDepartments_A:Successfull"));				
			}
			else
				oBuffer.append (getStatusXML (GT_Departments, -1, "UserInfoBL:getDepartments_A:UnSuccessfull"));
        }
        catch (Exception oException)
        {
            oBuffer.append (getStatusXML (GT_Departments, -1, "UserInfoBL:getDepartments_A:" + oException.toString ()));
            log (oBuffer.toString ());			
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
	
	private String getUserList_A ()
	{
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		ResultSet oResultSet = null;
		
		StringBuffer oBuffer = new StringBuffer ();
		
		String [] arrInfo = getParams (kCR_A_UserList);
		int nCompanyUnitId	= convertToInt (arrInfo [f_LCompanyUnitId]);
		String oDepartmentId = arrInfo [f_LDepartmentId];
		String oUserNameFltr = arrInfo [f_LUserNameFltr];
		
		String oCondition = "";
		
		if (oDepartmentId.equals ("0") == false)
			oCondition += " And en_0251d01_userinfo_sa.departmentid = " + oDepartmentId;
		
		if (oUserNameFltr.equals ("blank") == false)
			oCondition += " And en_0151a04_userinfo.username Like '%" + oUserNameFltr + "%' ";
		
		try
        {
            String oSQL =
				" Select en_0251d01_userinfo_sa.sa_userid, " +
					" en_0151a04_userinfo.userid, " +
					" en_0151a04_userinfo.username, " +
					" en_0251d01_userinfo_sa.groupid, " +
					" en_0151a03_usergroup.groupname_" + getLanguage () + ", " +
					" en_0251d01_userinfo_sa.email, " +
					" en_0251d01_userinfo_sa.emailcc, " +
					" en_0251d01_userinfo_sa.departmentid, " +
					" en_0251z00_department_sa.department_" + getLanguage () + ", " +
					" createdby.username As createdby, " +
					" Convert (varchar, en_0251d01_userinfo_sa.createddate, 103) As createddate, " +
					" Convert (varchar (5), en_0251d01_userinfo_sa.createddate, 108) As createdtime, " +
					" modifiedby.username As modifieddby, " +
					" Convert (varchar, en_0251d01_userinfo_sa.modifieddate, 103) As modifieddate, " +
					" Convert (varchar (5), en_0251d01_userinfo_sa.modifieddate, 108) As modifiedtime " +
				" From en_0251d01_userinfo_sa, en_0251z00_department_sa, en_0151a04_userinfo, " +
					" en_0151a03_usergroup, en_0151a04_userinfo As createdby, en_0151a04_userinfo As modifiedby " +
				" Where en_0251d01_userinfo_sa.userid = en_0151a04_userinfo.userid And " +
					" en_0251d01_userinfo_sa.groupid = en_0151a03_usergroup.groupid And " +
					" en_0251d01_userinfo_sa.departmentid = en_0251z00_department_sa.departmentid And " +
					" en_0251d01_userinfo_sa.createdby = createdby.userid And " +
					" en_0251d01_userinfo_sa.modifiedby = modifiedby.userid And " +
					" en_0251d01_userinfo_sa.unitid = " + nCompanyUnitId +
					oCondition +
				" Order By en_0251d01_userinfo_sa.departmentid, " +
					" en_0151a04_userinfo.username ";

			oStatement = oConnector.getStatement ();
			oResultSet = oConnector.executeQuery (oSQL, oStatement);
			
			if (oResultSet != null)    
			{
				oBuffer.append (toXMLString (oResultSet, kSR_A_UserList));
				oBuffer.append (getStatusXML (GT_UserList, 1, "UserInfoBL:getUserList_A:Successfull"));				
			}
			else
				oBuffer.append (getStatusXML (GT_UserList, -1, "UserInfoBL:getUserList_A:UnSuccessfull"));
        }
        catch (Exception oException)
        {
            oBuffer.append (getStatusXML (GT_UserList, -1, "UserInfoBL:getUserList_A:" + oException.toString ()));
            log (oBuffer.toString ());			
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
	
	private String deleteUserInfo_A ()
	{
		StringBuffer oBuffer = new StringBuffer ();
		
		String [] arrInfo = getParams (kCR_A_Delete);
		int nSAUserId	= convertToInt (arrInfo [f_DSAUserId]);
		int nUserId	= convertToInt (arrInfo [f_DUserId]);
		
		if (isTxnPresent (nUserId) == false)
		{
			oBuffer.append (DataUtil.getRowXML (kSR_A_TxnPresent, "0"));				
			oBuffer.append (processDelete_A (nSAUserId));
		}
		else
			oBuffer.append (DataUtil.getRowXML (kSR_A_TxnPresent, "1"));
		
		return oBuffer.toString ();
	}
	
	private boolean isTxnPresent (int nUserId)
    {
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		ResultSet oResultSet = null;
		
		boolean bTxnPresent = false;        
		
		try
		{
			String oSQL =
    			" Select Count (*) As recordcount " +
    			" From en_0251d04_txnprocess_sa " +
    			" Where en_0251d04_txnprocess_sa.processedby = " + nUserId;

			oStatement = oConnector.getStatement ();			
			oResultSet = oConnector.executeQuery (oSQL, oStatement);

			if (oResultSet != null)
			{
				while (oResultSet.next ())
					bTxnPresent = (oResultSet.getInt ("recordcount") > 0);
			}            
		}
        catch (Exception oException)
        {
            log ("UserInfoBL:isTxnPresent:" + oException.toString ());
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
		            
        return bTxnPresent;
    }
	
	private String processDelete_A (int nSAUserId)
	{
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		
		StringBuffer oBuffer = new StringBuffer ();
		
		try
		{
			String oSQL =
                " Insert Into en_0251d01_userinfo_sa_del " +
                " ( " +
					" sa_userid, userid, unitid, " +
					" groupid, departmentid, email, " +
                    " password, emailcc, createdby, " +
                    " createddate, modifiedby, modifieddate, " +
					" deletedby, deleteddate " +
				" ) " +
                " Select sa_userid, userid, unitid, " +
                    " groupid, departmentid, email, " +
                    " password, emailcc, createdby, " +
                    " createddate, modifiedby, modifieddate, " +
                    " " + getUserId () + ", " + AccountingUtil.getDateString () + 
                " From en_0251d01_userinfo_sa " +
                " Where en_0251d01_userinfo_sa.sa_userid = " + nSAUserId;
			
			oStatement = oConnector.getStatement ();
			int nStatusId = oConnector.executeUpdate (oSQL, oStatement);
			
            if (nStatusId >= 1)
            {
            	oSQL = " Delete From en_0251d01_userinfo_sa where sa_userid = " + nSAUserId;
            	
            	nStatusId = oConnector.executeUpdate (oSQL, oStatement); 
                if (nStatusId >= 0)
                {
                	oBuffer.append (getStatusXML (T15_Delete, 1, "UserInfoBL:deleteUser_A:Successfull"));
                	oBuffer.append (getUserList_A ());
                }
                else
                    oBuffer.append (getStatusXML (T15_Delete, -1, "UserInfoBL:deleteUser_A:UnSuccessfull"));
            }
            else
                oBuffer.append (getStatusXML (T15_DelInsert, -1, "UserInfoBL:delInsertUser_A:UnSuccessfull" ));
		}
		catch (Exception oException)
		{
			oBuffer.append (getStatusXML (T15_ProcessDelete, -1, "UserInfoBL:processDelete_A:" + oException.toString ()));
            log (oBuffer.toString ());
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
	
	private String getInitData_AA ()
    {
        StringBuffer oBuffer = new StringBuffer ();       
      
        oBuffer.append (getFunctionPM (getUserId (), kModuleId, T21_FunctionPM));
        oBuffer.append (getDepartmentsEx_AA ());
        oBuffer.append (getUserGroups_AA ());
		
        return oBuffer.toString ();        		       
    }
	
	private String getDepartmentsEx_AA ()
	{
		StringBuffer oBuffer = new StringBuffer ();
		
		oBuffer.append (getDepartments_A (kSR_AA_Departments, ConstantsUtil.kFE_ChooseOne));
		
		return oBuffer.toString (); 
	}
	
	private String getUserGroups_AA ()
	{
		StringBuffer oBuffer = new StringBuffer ();
		
		oBuffer.append (AccountingUtil.getUserGroups (this, T21_UserGroups, kSR_AA_UserGroups, ConstantsUtil.kFE_ChooseOne));
		
		return oBuffer.toString ();
	}
	
	private String getUserInfo_AA ()
	{
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		ResultSet oResultSet = null;
		
		StringBuffer oBuffer = new StringBuffer ();
		
		String [] arrInfo = getParams (kCR_AA_UserInfo);
		int nUserGroupId = convertToInt(arrInfo [f_UIUserGroupId]);
		int nCompanyUnitId = convertToInt(arrInfo [f_UICompanyUnitId]);
		
        try
        {			        
            String oSQL =
				" Select Distinct en_0151a04_userinfo.userid As id, " +
					" en_0151a04_userinfo.username, " +
					" en_0151a04_userinfo.email, " +
					" 1 As orderid " +  
				" From en_0151a04_userinfo " +
				" Where en_0151a04_userinfo.groupid = " + nUserGroupId + " And " +
    				" en_0151a04_userinfo.unitid = " + nCompanyUnitId + " And " +
    				" en_0151a04_userinfo.statusid = 1 " + " And " +
    				" en_0151a04_userinfo.userid Not In " +
    				" ( " +
    					" Select en_0251d01_userinfo_sa.userid " +
    					" From en_0251d01_userinfo_sa " +
    				" ) " + 
				" Union All " +  
				" Select 0 As id, " +
					" en_0251z00_firstelement.name_" + getLanguage () + " As username, " +
					" '' As email, " +
					" 0 As orderid " +
				" From en_0251z00_firstelement " +
				" Where en_0251z00_firstelement.id = " + ConstantsUtil.kFE_ChooseOne +
				" Order By orderid, username ";

			oStatement = oConnector.getStatement ();		
			oResultSet = oConnector.executeQuery (oSQL, oStatement);
			
			if (oResultSet != null)    
			{
				oBuffer.append (toXMLString (oResultSet, kSR_AA_UserInfo));
				oBuffer.append (getStatusXML (T22_UserInfo, 1, "UserInfoBL:getUserInfo_AA:Successfull"));				
			}
			else
				oBuffer.append (getStatusXML (T22_UserInfo, -1, "UserInfoBL:getUserInfo_AA:UnSuccessfull"));
        }
        catch (Exception oException)
        {
            oBuffer.append (getStatusXML (T22_UserInfo, -1, "UserInfoBL:getUserInfo_AA:" + oException.toString ()));
            log (oBuffer.toString ());			
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
	
	private String processUpdate_AA ()
	{
		StringBuffer oBuffer = new StringBuffer ();
		
		try
        {
            String [] arrInfo = getParams (kCR_AA_Update);
            int nSAUserId	= convertToInt (arrInfo [f_USAUserId]);
	
			if (nSAUserId == 0)
				oBuffer.append (insertUserInfo_AA (arrInfo));
			else if (nSAUserId > 0)
				oBuffer.append (updateUserInfo_AA (arrInfo));
        }
        catch (Exception oException)
        {
            oBuffer.append (getStatusXML (T23_ProcessUpdate, -1, "UserInfoBL:processUpdate_AA" + oException.toString ()));
            log (oBuffer.toString ());           
        }
		
        return oBuffer.toString ();
	}
	
	private String insertUserInfo_AA (String [] arrInfo)
	{
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		ResultSet oResultSet = null;
		
		StringBuffer oBuffer = new StringBuffer ();
		
		int nUserId = convertToInt(arrInfo [f_UUserId]);
		int nUserGroupId = convertToInt(arrInfo [f_UUserGroupId]);
		int nCompanyUnitId = convertToInt(arrInfo [f_UCompanyUnitId]);
		int nDepartmentId = convertToInt(arrInfo [f_UDepartmentId]);
		String oEmail = arrInfo [f_UEmail];
		String oPassword = arrInfo [f_UPassword];
		String oEmailCC = arrInfo [f_UEmailCC];
		
		try
        {			        
            String oSQL =
        		" Insert Into en_0251d01_userinfo_sa " +
        		" ( " +
					" userid, unitid, groupid, " +
					" departmentid, email, password, " +
					" emailcc, createdby, createddate, " +
					" modifiedby, modifieddate " +
				" ) " +
                " Values " +
                " ( " +
                	" " + nUserId + ", " + nCompanyUnitId + ", " + nUserGroupId + ", " +
					" " + nDepartmentId + ", '" + oEmail + "', '" + oPassword + "', " + 
					" '" + oEmailCC + "', " + getUserId () + ", " + AccountingUtil.getDateString () + ", " + 
					" " + getUserId () + ", " + AccountingUtil.getDateString () + 
				" ) ";
          
			oStatement = oConnector.getStatement ();	
			int nStatusId = oConnector.executeUpdate (oSQL, oStatement);
			
			if (nStatusId >= 0) 
				oBuffer.append (getStatusXML (T23_InsertUser, 1, "UserInfoBL:insertUserInfo_AA:Successfull"));
			else
                oBuffer.append (getStatusXML (T23_InsertUser, -1, "UserInfoBL:insertUserInfo_AA:UnSuccessfull"));
        }
        catch (Exception oException)
        {
            oBuffer.append (getStatusXML (T23_InsertUser, -1, "UserInfoBL:insertUserInfo_AA:" + oException.toString ()));
            log (oBuffer.toString ());			
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
	
	private String updateUserInfo_AA (String [] arrInfo)
	{
		DBConnector10251 oConnector = new DBConnector10251 ();        
		Statement oStatement = null;
		
		StringBuffer oBuffer = new StringBuffer ();
		
		int nSAUserId	= convertToInt (arrInfo [f_USAUserId]);
		int nDepartmentId = convertToInt(arrInfo [f_UDepartmentId]);
		String oEmail = arrInfo [f_UEmail];
		String oPassword = arrInfo [f_UPassword];
		String oEmailCC = arrInfo [f_UEmailCC];
		
		try
        {
            String oSQL = 
				" Update en_0251d01_userinfo_sa " +
				" Set departmentid = " + nDepartmentId + ", " +				
					" email = '" + oEmail + "', " +
					" password = '" + oPassword + "', " +
					" emailcc = '" + oEmailCC + "', " +	
					" modifiedby = " + getUserId () + ", " +
					" modifieddate = " + AccountingUtil.getDateString () +					
				" Where en_0251d01_userinfo_sa.sa_userid = " + nSAUserId;
            
			oStatement = oConnector.getStatement ();			
            int nStatusId = oConnector.executeUpdate (oSQL, oStatement);
            
            if (nStatusId >= 0)
                oBuffer.append (getStatusXML (T23_UpdateUser, 1, "UserInfoBL:updateUserInfo_AA:Successfull"));            
            else
                oBuffer.append (getStatusXML (T23_UpdateUser, -1, "UserInfoBL:updateUserInfo_AA:UnSuccessfull"));            
        }
        catch (Exception oException)
        {
            oBuffer.append (getStatusXML (T23_UpdateUser, -1, "UserInfoBL:updateUserInfo_AA:" + oException.toString ()));
            log (oBuffer.toString ());			
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
	
	public void log (String oMessage)
	{
//		logMessage (oMessage);
	}
}
