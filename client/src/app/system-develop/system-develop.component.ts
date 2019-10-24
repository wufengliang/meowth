import { Component, OnInit } from '@angular/core';
import { TableColumn, TableData, TableRow, TablePage } from '@pixelmon/pikachu/table';
import { SystemDevelopService } from './system-develop.service';
import { NzModalService, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { AddSystemDevelopComponent } from './add-system-develop/add-system-develop.component';

@Component({
  selector: 'app-system-develop',
  templateUrl: './system-develop.component.html',
  styleUrls: ['./system-develop.component.less']
})
export class SystemDevelopComponent implements OnInit {

  tableData: TableData = {
    data: [],
    totalSize: 0,
  };
  queryParams = {};

  tableLoading = false;
  selections: TableRow[] = [];
  columns: TableColumn[] = [
    {
      title: '姓名',
      field: 'name',
    },
    {
      title: '登录账号',
      field: 'username'
    },
    {
      title: '角色',
      field: 'roleName',
    },
    {
      title: '状态',
      field: 'statusName',
    },
    {
      title: '手机号码',
      field: 'mobile',
    },
    {
      title: 'QQ号',
      field: 'contactQQ',
    },
    {
      title: '邮箱',
      field: 'email'
    },
    {
      title: '项目经理',
      field: 'isBoolleaders'
    },
    {
      title: '操作',
      field: 'operate'
    }
  ];

  constructor(
    private service: SystemDevelopService,
    private modal: NzModalService,
    private msg: NzMessageService,
  ) { }

  ngOnInit() { }

  load(page: TablePage = { page: 1, size: 10 }) {
    this.selections = [];
    this.tableLoading = true;
    this.service.getAllList({}).subscribe(
      data => {
        this.tableData = data;
        this.tableLoading = false;
      },
      () => {
        this.tableLoading = false;
      }
    )

  }

  onQueryChange(queryParams) {
    this.queryParams = queryParams;
    window.setTimeout(() => this.load());
  }

  operate(type: string, data?: any): void {
    let params = {
      width: 550,
      nzMaskClosable: false,
      nzFooter: null
    }, modalRef: NzModalRef = null;
    switch (type) {
      case 'add':
        //  添加系统
        modalRef = this.modal.create({
          nzTitle: '添加开发人员',
          nzContent: AddSystemDevelopComponent,
          ...params,
          nzComponentParams: {
            type,
          }
        })
        break;
      case 'edit':
        //  编辑系统
        modalRef = this.modal.create({
          nzTitle: '编辑开发人员',
          nzContent: AddSystemDevelopComponent,
          ...params,
          nzComponentParams: {
            data: data || this.selections[0],
            type
          }
        })
        break;
      case 'delete':
        this.modal.confirm({
          nzTitle: '提示',
          nzContent: `是否删除<b>${data ? data.name : this.selections.map(item => item.name).join('、')}</b>开发人员配置？`,
          ...params,
          nzOnOk: () => {
            this.service.deleteDeveloper({ ids: data ? [data._id] : this.selections.map(item => item._id) }).subscribe(
              () => {
                this.msg.success('删除成功');
                this.load();
              }
            )
          }
        })
        break;
      default:
        break;
    }

    if (!modalRef) {
      return;
    }

    modalRef.afterClose.subscribe(
      result => {
        if (result === 'success') {
          this.msg.success(`${type === 'add' ? '添加' : '编辑'}成功`);
          this.load();
        }
      }
    )
  }

}
