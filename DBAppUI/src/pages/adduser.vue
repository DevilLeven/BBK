<template>
  <div>
    <el-button class="goback" @click.prevent="goback"> << 返回 </el-button>
    <div class="dfbox" v-loading.body="loading">
      <div class="title">添加学员</div>
      <div class="cont " style="padding: 20px 0">
        <div style="font-size: 15px;padding: 10px;border-bottom: 1px solid #eeeeee;margin-bottom: 10px">
          基本信息
        </div>
        <el-form :inline="true" :model="form" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="性别" style="width: 169px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="form.marriage" placeholder="婚姻状况" style="width: 169px">
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="未婚" value="未婚"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="子女情况">
            <el-select v-model="form.child" placeholder="子女情况" style="width: 169px">
              <el-option label="有" value="有"></el-option>
              <el-option label="无" value="无"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="form.nation"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="form.wechat"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="form.idNo"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker
              v-model="form.birthAt"
              type="date"
              placeholder="出生日期" style="width: 169px;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作年数">
            <el-input v-model="form.worked"></el-input>
          </el-form-item>
          <el-form-item label="出生地">
            <el-input v-model="form.birthAddress" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item label="户籍地址">
            <el-input v-model="form.idAddress" style="width: 400px"></el-input>
          </el-form-item>

          <el-form-item label="现住地址">
            <el-input v-model="form.address" style="width: 400px"></el-input>
          </el-form-item>
        </el-form>
        <div style="font-size: 15px;padding: 10px;border-bottom: 1px solid #eeeeee;margin-bottom: 10px">
          教育经历
        </div>
        <el-form :inline="true" v-for="(domain, index) in form.educationList">
          <el-form-item>
            <el-input v-model="domain.name" placeholder="学校名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.level" placeholder="学历"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="domain.beginAt"
              type="date"
              placeholder="入学日期" style="width: 169px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="domain.endAt"
              type="date"
              placeholder="毕业日期" style="width: 169px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.duration" placeholder="在籍年数"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.info" placeholder="备注" type="textarea" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="index>0" @click.prevent="removeDomain(domain,'educationList')">删除</el-button>
          </el-form-item>
        </el-form>
        <el-button @click.prevent="addDomain('educationList')">新增</el-button>
        <div style="font-size: 15px;padding: 10px;border-bottom: 1px solid #eeeeee;margin-bottom: 10px">
          工作经历
        </div>
        <el-form :inline="true" v-for="(domain, index) in form.workList">
          <el-form-item>
            <el-input v-model="domain.name" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.position" placeholder="职位"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.city" placeholder="城市"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="domain.beginAt"
              type="date"
              placeholder="入职日期" style="width: 169px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="domain.endAt"
              type="date"
              placeholder="离职日期" style="width: 169px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.info" placeholder="备注" type="textarea" style="width: 400px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button v-if="index>0" @click.prevent="removeDomain(domain,'workList')">删除</el-button>
          </el-form-item>
        </el-form>
        <el-button @click.prevent="addDomain('workList')">新增</el-button>
        <div style="font-size: 15px;padding: 10px;border-bottom: 1px solid #eeeeee;margin-bottom: 10px">
          资格证书
        </div>
        <el-form :inline="true" v-for="(domain, index) in form.skillList">
          <el-form-item>
            <el-input v-model="domain.name" placeholder="资格证名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.skillNumber" placeholder="资格证编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="domain.level" placeholder="等级"></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="domain.beginAt"
              type="date"
              placeholder="发证日期" style="width: 169px;"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="domain.endAt"
              type="date"
              placeholder="到期日期" style="width: 169px;"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button @click.prevent="removeDomain(domain,'skillList')">删除</el-button>
          </el-form-item>

        </el-form>
        <el-button @click.prevent="addDomain('skillList')">新增</el-button>
      </div>
      <div style="text-align: center;padding-bottom: 20px">
        <el-button type="primary" @click.prevent="doaction()">添加学员</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const education={
    beginAt: "",
    duration:"",
    endAt:"",
    info:"",
    level:"",
    name:""
  };
  const work={
    name:"",
    position:"",
    beginAt:"",
    endAt:"",
    info:"",
    city:""
  };
  const skill={
    name:"",
    beginAt:"",
    endAt:"",
    level:"",
    skillNumber:""
  };
  export default{
    data(){
      return {
        loading:false,
        form: {
          name:"",
          age:"",
          marriage:"",
          sex:"",
          child:"",
          nation:"",
          mobile:"",
          wechat:"",
          qq:"",
          idNo:"",
          birthAt:"",
          worked:"",
          birthAddress:"",
          idAddress:"",
          address:"",
          educationList: [
            {
              beginAt: "",
              duration:"",
              endAt:"",
              info:"",
              level:"",
              name:""
            }
          ],
          workList:[
            {
              name:"",
              position:"",
              beginAt:"",
              endAt:"",
              info:"",
              city:""
            }
          ],
          skillList:[
            {
              name:"",
              beginAt:"",
              endAt:"",
              level:"",
              skillNumber:""
            }
          ]
        }
      }
    },

    methods: {
      removeDomain(item,d){
        var index = this.form[d].indexOf(item);
        if (index !== -1) {
          this.form[d].splice(index, 1)
        }
      },
      addDomain(d) {
        if(d=="educationList"){
          this.form[d].push(education);
        }else  if(d=="workList"){
          this.form[d].push(work);
        }else  if(d=="skillList"){
          this.form[d].push(skill);
        }
      },
      doaction(){
        if(this.form.name.trim()==""){
          this.$message({
            showClose: true,
            message: '请填写学员名称',
            type: 'warning'
          });
          return false
        }
        this.form.educationList=this.form.educationList.filter(function (val) {
          return val.name.trim()!="";
        });this.form.workList=this.form.workList.filter(function (val) {
          return val.name.trim()!="";
        });this.form.skillList=this.form.skillList.filter(function (val) {
          return val.name.trim()!="";
        });
        this.loading=true;
        this.$http({
          method:'post',
          url:'api/bd/addstudent',
          body:this.form
        }).then(function (response) {
          let data=response.data;
          this.loading=false;
          if (data.result&&data.result=="success"){
            this.initdata();

            this.$notify({
              title: '成功',
              message: data.resultEntity.message,
              type: 'success'
            });
          }else if(data.result) {
            this.$notify({
              title: '失败',
              message: data.resultEntity.message,
              type: 'error'
            });
          }
        },function (error) {
          this.loading=false;
        });
      },
      goback(){
        window.history.go(-1)
      },
      initdata(){
        this.form={
          name:"",
            age:"",
            marriage:"",
            sex:"",
            child:"",
            nation:"",
            mobile:"",
            wechat:"",
            qq:"",
            idNo:"",
            birthAt:"",
            worked:"",
            birthAddress:"",
            idAddress:"",
            address:"",
            educationList: [
            {
              beginAt: "",
              duration:"",
              endAt:"",
              info:"",
              level:"",
              name:""
            }
          ],
            workList:[
            {
              name:"",
              position:"",
              beginAt:"",
              endAt:"",
              info:"",
              city:""
            }
          ],
            skillList:[
            {
              name:"",
              beginAt:"",
              endAt:"",
              level:"",
              skillNumber:""
            }
          ]
        }
      }
    }
  }
</script>
