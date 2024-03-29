# Generated by Django 4.1 on 2022-12-03 20:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_trxn_account_alter_trxn_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Goal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=240, null=True)),
                ('goal', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date', models.DateField()),
                ('raised', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.RenameField(
            model_name='account',
            old_name='accName',
            new_name='name',
        ),
        migrations.RenameField(
            model_name='account',
            old_name='accNum',
            new_name='num',
        ),
        migrations.RemoveField(
            model_name='account',
            name='accType',
        ),
        migrations.AddField(
            model_name='account',
            name='subType',
            field=models.CharField(choices=[('Asset', 'Ass'), ('Liability', 'Lia'), ('Income', 'Inc'), ('Expense', 'Exp')], default=1, max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='account',
            name='type',
            field=models.CharField(choices=[('Own', 'Own'), ('Flow', 'Flow'), ('Save', 'Save')], default=0, max_length=10),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='trxn',
            name='account',
            field=models.ForeignKey(limit_choices_to=models.Q(('Type', 'Own')), on_delete=django.db.models.deletion.CASCADE, related_name='account', to='api.account'),
        ),
        migrations.AlterField(
            model_name='trxn',
            name='category',
            field=models.ForeignKey(limit_choices_to=models.Q(('Type', 'Flow')), on_delete=django.db.models.deletion.CASCADE, related_name='category', to='api.account'),
        ),
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.DateField()),
                ('account', models.CharField(max_length=240, null=True)),
                ('budget', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.ForeignKey(limit_choices_to=models.Q(('Type', 'Flow')), on_delete=django.db.models.deletion.CASCADE, related_name='budget_category', to='api.account')),
            ],
        ),
    ]
