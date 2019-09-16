/** 
 * api接口的统一出口
 */

import mid_menu from '@api/sysAdmin/api/mid_menu';
import identity from '@api/sysAdmin/api/identity';
import mid_gform from '@api/sysAdmin/api/mid_gform';
import mid_module from '@api/sysAdmin/api/mid_module';

// 导出接口
export default {
    identity,
    mid_menu,
    mid_gform,
    mid_module
}