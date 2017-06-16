<?php
$accounts = array 
(
    'https://www.instagram.com/photowaali/',
    'https://www.instagram.com/indiapictures/',
    'https://www.instagram.com/demo-master/',
    'https://www.instagram.com/shivesh17/',
    'https://www.instagram.com/fotobaba/',
    'https://www.instagram.com/dayanitasingh/',
    'https://www.instagram.com/no-url-error/',
    'https://www.instagram.com/hashimbadani/',
    'https://www.instagram.com/no-url-error/',
    );
    ?>
    <div class="container-fluid">
        <div class="alert alert-danger user-error hide"></div>
        <div class="row">
            <div class="content">
                <div class="modal-header">                
                    <h4 class="modal-title">Enter Instagram account url:</h4>
                    <div id='indicator' class="progress">
                        <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">0%</div>
                    </div>                 
                </div>
                <form action="" method="post" id="form-collector" autocomplete="off">
                    <div class="modal-body">
                        <div class="row extra">
                            <?php if (isset($_GET['dummy'])) { ?>
                            <?php foreach ($accounts as $key => $value): ?>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="iUrl">Link</label>&nbsp;&nbsp;&nbsp;<span class="user-info label label-info"></span> 
                                        <div class="txt-progress"></div>
                                        <input type="text" class="form-control insta-url" name="iUrl[]" value="<?=$value?>" placeholder="You can add another box by 'Add New'" />
                                    </div>
                                </div>
                            <?php endforeach ?>
                            <?php } else { ?>
                            <!-- section -->
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="iUrl">Link</label>&nbsp;&nbsp;&nbsp;<span class="user-info label label-info"></span> 
                                    <div class="txt-progress"></div>
                                    <input type="text" class="form-control insta-url" name="iUrl[]" value="" placeholder="You can add another box by 'Add New'" />
                                </div>
                            </div>
                            <?php } ?>                           
                        </div> 
                    </div>
                    <div class="modal-footer">
                        <!-- Footer Content Here -->
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="row">&nbsp;</div>
    <div class="row">&nbsp;</div>
    <!-- cloning input -->
    <div class="clone hide">
        <div class="col-md-4">
            <div class="form-group">
                <label for="iUrl">Link</label>&nbsp;&nbsp;&nbsp;<span class="user-info label label-info"></span>  
                <div class="input-group">
                  <span class="input-group-addon">
                    <input type="checkbox" class="chk-input">
                </span>
                <div class="txt-progress"></div>
                <input type="text" class="form-control insta-url" name="iUrl[]" value="" />
            </div>
        </div>
    </div>
</div>