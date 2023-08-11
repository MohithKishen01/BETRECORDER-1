<table id="tblMain" class="table_bg" width="700" align="center" cellpadding="0" cellspacing="0" border="0">
	<tr>
		<td>
			<%@ include file="goto.inc" %>
		</td>
	</tr>
	<tr>
		<td class="border_left_bottom_right">
			<table class="table_bg" align="right" cellpadding="0" cellspacing="0" border="0">
				<tr height="26">
					<td>
						Company Unit
					</td>
					<td width="10"></td>
					<td>
						Department
					</td>
					<td width="10"></td>
					<td>
						Search
					</td>
					<td width="10"></td>
					<td width="5"></td>
					<td>
						<font class="boldlink" onclick="addUserClicked_102510601a (0)" title="Click here to Add User">Add User</font>
					</td>
					<td width="5"></td>
				</tr>
				<tr height="26">
					<td>
						<select class="dropdown" id="cbCompanyUnits" onchange="companyUnitChanged_102510601a ()" onkeyup="UDModule.COMP.changeFocus_CV (event, 'cbDepartments')">
							<option value="0">[Choose One]</option>
						</select>
					</td>
					<td></td>
					<td>
						<select id="cbDepartments" class="dropdown" onchange="departmentChanged_102510601a ()"  onkeyup="UDModule.COMP.changeFocus_CV (event, 'txtUserNameFltr')">
							<option value="0">[All]</option>
						</select>
					</td>
					<td></td>
					<td>
						<input type="text" id="txtUserNameFltr" class="textboxcenter" maxlength="50" size="15" onkeypress="searchKeyPressed_102510601a (event)"/>
					</td>
					<td id="tdSearch" valign="center">
						<img src="../../../../resource/images/default/info/search.gif" class="cursor" onclick="searchImgClicked_102510601a ()" />
					</td>
					<td></td>
					<td></td>
				</tr>			
			</table>
		</td>
	</tr>
	<tr height="5"><td></td></tr>
	<tr>
		<td width="700">
        	<table width="100%" cellpadding="0" cellspacing="0" border="0">
			    <tr>
			        <td id="tdUserList" align="left" display="none">
			            <div id="divUserList" style="width:700; height:440; overflow:auto;"></div>
			        </td>
			    </tr>
			</table>
			<div id="divToolTip" style="position:absolute; visibility:hidden;"></div>
    	</td> 
	</tr>
</table>