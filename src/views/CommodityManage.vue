<template>
	<div>
		<!-- 大标题 -->
		<div class="headline">宝贝管理</div>

		<!-- 功能区域 -->
		<div class="d-flex justify-content-end mt-4 mb-4">
			<el-input placeholder="请输入搜索内容" size="medium" class="mr-4 w-25"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
			<el-button type="primary" size="medium" icon="el-icon-circle-plus-outline" @click="commodityAddDV = true">增加宝贝</el-button>
			<el-button type="danger" size="medium" icon="el-icon-delete" plain @click="commodityBatchDelete">批量删除</el-button>
		</div>

		<!-- 商品列表 -->
		<div>
			<el-table :data="commodityList" @selection-change="commoditySelect" stripe border>
				<el-table-column type="selection" fixed></el-table-column>
				<el-table-column label="名称">
					<template slot-scope="scope">
						<el-button type="text" @click="viewCommodityDetail(scope.row)">{{ scope.row.name }}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="pt" label="平台" show-overflow-tooltip></el-table-column>
				<el-table-column prop="typeName" label="分类" show-overflow-tooltip></el-table-column>
				<el-table-column prop="price" label="价格" show-overflow-tooltip></el-table-column>
				<el-table-column prop="yhq" label="优惠券" show-overflow-tooltip></el-table-column>
				<el-table-column prop="yj" label="佣金比例" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" icon="el-icon-edit" plain @click="commodityEdit(scope.row)"></el-button>
						<el-button type="danger" size="mini" icon="el-icon-delete" plain @click="commodityDelete(scope.row)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="d-flex justify-content-center mt-4">
				<el-pagination
					layout="prev, pager, next"
					hide-on-single-page
					:total="commodityListPage.total"
					:page-size="commodityListPage.pageSize"
					:current-page="commodityListPage.currentPage"
					@current-change="commodityListCurrentChange"
				></el-pagination>
			</div>
		</div>

		<!-- 商品详情对话框 -->
		<el-dialog title="宝贝详情" width="1000px" :visible.sync="commodityDetailDV">
			<el-row>
				<el-col :span="8">名称：{{ this.commodityDetail.name }}</el-col>
				<el-col :span="8">平台：{{ this.commodityDetail.pt }}</el-col>
				<el-col :span="8">分类：{{ this.commodityDetail.typeName }}</el-col>
				<el-col :span="8">价格：{{ this.commodityDetail.price }}</el-col>
				<el-col :span="8">优惠券：{{ this.commodityDetail.yhq }}</el-col>
				<el-col :span="8">佣金比例：{{ this.commodityDetail.yj }}</el-col>
				<el-col :span="24">
					链接：
					<el-link :href="this.commodityDetail.lj" target="_blank" type="primary">{{ commodityDetail.lj }}</el-link>
				</el-col>
				<el-col :span="12" class="d-flex">
					<span>图片：</span>
					<img :src="this.commodityDetail.tp" class="w-75" />
				</el-col>
			</el-row>
		</el-dialog>

		<!-- 添加商品对话框 -->
		<el-dialog title="添加宝贝" width="1000px" :visible.sync="commodityAddDV" :before-close="cADClose">
			<el-form :model="commodityAddForm" :rules="commodityAddRules" ref="commodityAddFormRef" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="名称" prop="name" required>
							<el-input type="text" placeholder="请输入宝贝名称" v-model="commodityAddForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="平台" prop="pt" required>
							<el-select v-model="commodityAddForm.pt" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option label="淘宝" value="淘宝"></el-option>
								<el-option label="抖音小店" value="抖音小店"></el-option>
								<el-option label="京东" value="京东"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="分类" prop="typeName" required>
							<el-select v-model="commodityAddForm.typeName" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="价格" prop="price" required>
							<el-input type="text" placeholder="请输入宝贝价格" v-model="commodityAddForm.price" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="优惠券" prop="yhq" required>
							<el-input type="text" placeholder="请输入优惠券" v-model="commodityAddForm.yhq" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="佣金比例" prop="yj" required>
							<el-input type="number" placeholder="请输入佣金比例" v-model="commodityAddForm.yj" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="链接" prop="lj" required>
							<el-input type="text" placeholder="请输入宝贝链接" v-model="commodityAddForm.lj" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="图片">
							<el-upload class="img-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploadCommodityImg">
								<img :src="commodityAddForm.tp" v-if="commodityAddForm.tp" />
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="submitCAF">确认修改</el-button>
					<el-button type="primary" size="medium" plain @click="resetCAF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>

		<!-- 编辑商品对话框 -->
		<el-dialog title="编辑宝贝" width="1000px" :visible.sync="commodityEditDV" :before-close="cEDClose">
			<el-form :model="commodityEditForm" :rules="commodityEditRules" ref="commodityEditFormRef" label-width="100px" status-icon>
				<el-row :gutter="20">
					<el-col :span="8">
						<el-form-item label="名称" prop="name" required>
							<el-input type="text" placeholder="请输入宝贝名称" v-model="commodityEditForm.name" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="平台" prop="pt" required>
							<el-select v-model="commodityEditForm.pt" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option label="淘宝" value="淘宝"></el-option>
								<el-option label="抖音小店" value="抖音小店"></el-option>
								<el-option label="京东" value="京东"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="分类" prop="typeName" required>
							<el-select v-model="commodityEditForm.typeName" clearable>
								<el-option label="请选择" value=""></el-option>
								<el-option v-for="(v, i) in commodityClassify" :key="i" :label="v" :value="v"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="价格" prop="price" required>
							<el-input type="text" placeholder="请输入宝贝价格" v-model="commodityEditForm.price" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="优惠券" prop="yhq" required>
							<el-input type="text" placeholder="请输入优惠券" v-model="commodityEditForm.yhq" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="佣金比例" prop="yj" required>
							<el-input type="number" placeholder="请输入佣金比例" v-model="commodityEditForm.yj" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="链接" prop="lj" required>
							<el-input type="text" placeholder="请输入宝贝链接" v-model="commodityEditForm.lj" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item label="图片">
							<el-upload class="img-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="uploadCommodityImg">
								<img :src="commodityEditForm.tp" v-if="commodityEditForm.tp" />
								<i v-else class="el-icon-plus img-uploader-icon"></i>
							</el-upload>
						</el-form-item>
					</el-col>
				</el-row>

				<div class="d-flex justify-content-center">
					<el-button type="primary" size="medium" @click="submitCEF">确认修改</el-button>
					<el-button type="primary" size="medium" plain @click="resetCEF">重置</el-button>
				</div>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import * as commodity from '@/api/commodity';

export default {
	name: 'CommodityManage',
	data() {
		return {
			/* ======================== 商品 ======================== */
			// 分类
			commodityClassify: [],
			// 列表
			commodityList: [
				{
					id: '1',
					name: '商品1',
					pt: '淘宝',
					typeName: '自营',
					tp: 'https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif',
					lj: 'http://www.baidu.com',
					price: '150元',
					yhq: '1个',
					yj: '1'
				},
				{
					id: '2',
					name: '商品2',
					pt: '淘宝',
					typeName: '自营',
					tp: 'https://www.baidu.com/img/sjdhdong_2f0815641b0fb86e10289d06a632f3f1.gif',
					lj: 'www.baidu.com',
					price: '150元',
					yhq: '1个',
					yj: '1'
				}
			],
			// 分页
			commodityListPage: {
				total: 15,
				pageSize: 10,
				totalPage: 1,
				currentPage: 1
			},
			// 已选择
			commoditySelected: [],
			/* ======================== 商品详情对话框 ======================== */
			// 显示隐藏
			commodityDetailDV: false,
			// 详情
			commodityDetail: {
				id: '',
				name: '',
				pt: '',
				typeName: '',
				tp: '',
				lj: '',
				price: '',
				yhq: '',
				yj: ''
			},
			/* ======================== 添加商品对话框 ======================== */
			// 显示隐藏
			commodityAddDV: false,
			// 表单
			commodityAddForm: {
				id: '',
				name: '',
				pt: '',
				typeName: '',
				tp: '',
				lj: '',
				price: '',
				yhq: '',
				yj: ''
			},
			// 表单校验规则
			commodityAddRules: {
				name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
				pt: [{ required: true, message: '请选择平台', trigger: ['blur', 'change'] }],
				typeName: [{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }],
				lj: [{ required: true, message: '请输入链接', trigger: ['blur', 'change'] }],
				price: [{ required: true, message: '请输入价格', trigger: ['blur', 'change'] }],
				yhq: [{ required: true, message: '请输入优惠券', trigger: ['blur', 'change'] }],
				yj: [{ required: true, message: '请输入佣金比例', trigger: ['blur', 'change'] }]
			},
			/* ======================== 编辑商品对话框 ======================== */
			// 显示隐藏
			commodityEditDV: false,
			// 表单
			commodityEditForm: {
				id: '',
				name: '',
				pt: '',
				typeName: '',
				tp: '',
				lj: '',
				price: '',
				yhq: '',
				yj: ''
			},
			// 表单校验规则
			commodityEditRules: {
				name: [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }],
				pt: [{ required: true, message: '请选择平台', trigger: ['blur', 'change'] }],
				typeName: [{ required: true, message: '请选择分类', trigger: ['blur', 'change'] }],
				lj: [{ required: true, message: '请输入链接', trigger: ['blur', 'change'] }],
				price: [{ required: true, message: '请输入价格', trigger: ['blur', 'change'] }],
				yhq: [{ required: true, message: '请输入优惠券', trigger: ['blur', 'change'] }],
				yj: [{ required: true, message: '请输入佣金比例', trigger: ['blur', 'change'] }]
			}
		};
	},
	methods: {
		/* ======================== 商品 ======================== */
		// 获取商品分类
		getCommodityClassify() {
			commodity
				.fetchCommodityClassify()
				.then(res => {
					res.list.forEach(e => {
						this.commodityClassify.push(e.name);
					});
				})
				.catch(() => {});
		},
		// 获取商品列表
		getCommodityList() {},
		// 选择商品
		commoditySelect(e) {
			this.commoditySelected = e;
		},
		// 商品列表当前页切换
		commodityListCurrentChange(currentPage) {
			this.commodityListPage.currentPage = currentPage;
		},
		// 查看商品详情
		viewCommodityDetail(e) {
			this.commodityDetailDV = true;
			this.commodityDetail = e;
		},
		// 上传商品图片
		uploadCommodityImg(res, file) {
			this.commodityEditForm.tp = URL.createObjectURL(file.raw);
		},
		// 编辑商品
		commodityEdit(e) {
			this.commodityEditDV = true; // 编辑商品对话框 显示
			this.commodityEditForm = e;
		},
		// 删除商品
		commodityDelete(e) {
			this.$confirm('确认删除？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning'
			})
				.then(() => {
					console.log(e);
					// commodity.handleCommodityDelete()
				})
				.catch(() => {});
		},
		// 批量删除商品
		commodityBatchDelete() {
			if (this.commoditySelected.length === 0) {
				this.$message.warning('请选择至少一项');
			} else {
				console.log(this.commoditySelected);
				// commodity.handleCommodityDelete()
			}
		},
		/* ======================== 添加商品对话框 ======================== */
		// 确认修改
		submitCAF() {
			this.$refs['commodityAddFormRef'].validate(valid => {
				if (valid) {
					console.log(1);
					// commodity.handleCommodityAdd().then(res => {

					// }).catch(() => {});
				}
			});
		},
		// 重置
		resetCAF() {
			this.$refs['commodityAddFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		// 关闭
		cADClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					this.$refs['commodityAddFormRef'].resetFields();
					done();
				})
				.catch(() => {});
		},
		/* ======================== 编辑商品对话框 ======================== */
		// 确认修改
		submitCEF() {
			this.$refs['commodityEditFormRef'].validate(valid => {
				if (valid) {
					console.log(1);
					// commodity.handleCommodityEdit().then(res => {

					// }).catch(() => {});
				}
			});
		},
		// 重置
		resetCEF() {
			this.$refs['commodityEditFormRef'].resetFields();
			this.$message.success('输入信息已重置');
		},
		// 关闭
		cEDClose(done) {
			this.$confirm('确认关闭？', '提示', {
				confirmButtonText: '关闭',
				cancelButtonText: '取消',
				type: 'info'
			})
				.then(() => {
					done();
				})
				.catch(() => {});
		}
	},
	mounted() {
		this.getCommodityClassify(); // 获取商品分类
	}
};
</script>
