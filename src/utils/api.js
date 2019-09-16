/** 
 * api接口的统一出口
 */

import mid_menu from '@api/SysAdmin/mid_menu';
import identity from '@api/SysAdmin/identity';
import mid_gform from '@api/SysAdmin/mid_gform';
import mid_module from '@api/SysAdmin/mid_module';
import mid_application from '@api/SysAdmin/mid_application';
import mid_actiontype from '@api/SysAdmin/mid_actiontype';
import mid_gformaction from '@api/SysAdmin/mid_gformaction';
import mid_usergroup from '@api/SysAdmin/mid_usergroup';
import nc_sysuser from '@api/SysAdmin/nc_sysuser';
import mid_usrgroupauth from '@api/SysAdmin/mid_usrgroupauth';
import mid_usrgroupusr from '@api/SysAdmin/mid_usrgroupusr';
import ocompany from '@api/SysAdmin/ocompany';
import ocostcenter from '@api/SysAdmin/ocostcenter';


// 导出接口
export default {
    identity,
    mid_menu,
    mid_gform,
    mid_module,
    mid_application,
    mid_actiontype,
    mid_gformaction,
    mid_usergroup,
    nc_sysuser,
    mid_usrgroupauth,
    mid_usrgroupusr,
    ocompany,
    ocostcenter,
}