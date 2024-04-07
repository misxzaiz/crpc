package chen.shangquan.modules.test.service;

import chen.shangquan.crpc.model.po.ServerInfo;
import chen.shangquan.crpc.server.annotation.ServerRegister;
import chen.shangquan.modules.test.impl.TestService;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
@ServerRegister(className = "DemoService")
public class DemoService {
//    @RpcResource
    @Resource
    @Lazy
    private TestService testService;

    public String test(String test) {
//        TestService testService = ServiceAgent.createService(TestService.class);
        String test1 = testService.test(test);
        System.out.println(test1);
        testService.testVoid("uahjd");
        ServerInfo serverInfo = testService.testPo("sgdiuaoi");
        System.out.println(serverInfo);
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));
    }
}
