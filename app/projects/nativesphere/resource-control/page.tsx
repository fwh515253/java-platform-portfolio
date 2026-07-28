import { NativeCapabilityDetail } from "../../_components/native-capability-detail";

export default function ResourceControlPage() {
  return <NativeCapabilityDetail spec={{
    code:"resource-control", title:"资源控制面", subtitle:"将 Kubernetes 原生资源转换为统一、可操作、可追踪的平台对象。",
    period:"2023.10—2026.03",
    overview:"平台尽可能接管 Kubernetes 资源及其生命周期，使用户能够在同一入口中完成资源创建、变更、查询、删除、状态查看、事件与日志定位，而不必直接操作 YAML 和命令行。",
    integration:"资源控制面是 NativeSphere 的基础。应用交付、服务治理、监控告警与 AI 运维都通过统一资源标识、命名空间和运行状态与它建立关联。",
    capabilities:[["平台空间","集群接入、工作空间、命名空间、资源范围与配额。"],["工作负载","Deployment、StatefulSet、DaemonSet、Job、CronJob、Pod 等资源的生命周期及运行状态。"],["网络资源","Service、Ingress 等网络对象及其关联关系和访问状态。"],["存储与配置","PV、PVC、StorageClass、ConfigMap、Secret 等资源的管理与使用关系。"],["运行信息","资源状态、条件、事件、Pod 日志与异常信息的统一查询。"]],
    mechanisms:[["资源模型转换","在平台领域对象与 Kubernetes API 对象之间进行字段映射、默认值处理和响应转换。"],["操作与状态分离","区分用户操作请求、API Server 接收结果和控制器最终运行状态，避免把请求成功等同于资源就绪。"],["统一异常处理","处理权限、资源不存在、版本冲突、字段校验和集群连接异常，并转换为平台可理解的错误。"],["关联关系组织","通过集群、命名空间、标签、所有者引用等信息串联资源及其上下游对象。"]],
    flow:["选择集群与空间","构造平台资源模型","转换并调用 Kubernetes API","同步资源状态与条件","关联事件和日志","返回可操作结果"],
    ownership:["封装 Kubernetes API 访问及常用资源操作接口。","参与平台资源模型、请求参数和响应结构设计。","处理资源增删改查、状态同步、事件日志查询及异常转换。","配合前端完成资源列表、详情、创建和运行状态页面联调。","参与接口测试、部署验证和线上资源问题定位。"],
    value:["形成可扩展的 Kubernetes 资源接管框架，使新增资源类型可以沿用统一交互和状态处理方式。","为应用交付、服务治理和监控告警提供统一资源上下文，避免各模块重复维护集群对象。","降低研发和运维人员直接使用 YAML、kubectl 及多套基础设施工具的成本。"]
  }} />;
}
